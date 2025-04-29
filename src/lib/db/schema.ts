import { sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    userId: uuid("userId").defaultRandom().primaryKey(),
  },
  (table) => ({})
);

/**
 * Represents product categories in a hierarchical structure
 * @example 
 * - Mobiles
 * - Laptops
 */
export const categories = pgTable(
  "categories",
  {
    categoryId: uuid("categoryId").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    imageUrl: text("imageUrl"),
    isActive: boolean("isActive").notNull().default(true),
    otherData: jsonb("otherData"),
    // otherData: jsonb('otherData').default(sql`'{}'::jsonb`),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      slugIndex: uniqueIndex("categorySlugIdx").on(table.slug),
      activeIndex: index("categoryIsActiveIdx").on(table.isActive),
    };
  }
);

/**
 * Represents manufacturers or product brands
 * @example Apple, Samsung, Nike
 */
export const brands = pgTable(
  "brands",
  {
    brandId: uuid("brandId").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    logoUrl: text("logoUrl"),
    websiteUrl: text("websiteUrl"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      slugIndex: uniqueIndex("brandSlugIdx").on(table.slug),
    };
  }
);

/**
 * Junction table representing which brands operate in which categories
 * @example 
 * - Apple → Mobiles
 * - Apple → Laptops
 * - Nike → Shoes
 */
export const brandCategories = pgTable(
  "brandCategories",
  {
    brandId: uuid("brandId")
      .notNull()
      .references(() => brands.brandId, { onDelete: "cascade" }),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => categories.categoryId, { onDelete: "cascade" }),
    brandCategoryName: varchar("brandCategoryName"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.brandId, table.categoryId] }),
    };
  }
);

/**
 * Represents base product models in the catalog
 * @example 
 * - iPhone 15
 * - MacBook Pro M3
 * - Air Jordan 1
 */
export const products = pgTable(
  "products",
  {
    productId: uuid("productId").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    // Base price might be useful, or rely solely on variant prices
    basePrice: decimal("basePrice", { precision: 10, scale: 2 }),
    brandId: uuid("brandId")
      .notNull()
      .references(() => brands.brandId, { onDelete: "restrict" }),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => categories.categoryId, { onDelete: "restrict" }),
    isActive: boolean("isActive").notNull().default(true),
    primaryImageUrl: text("primaryImageUrl"),
    otherData: jsonb("otherData"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("productsSlugIdx").on(table.slug),
    index("productsBrandIdIdx").on(table.brandId),
    index("productsCategoryIdIdx").on(table.categoryId),
    index("productsIsActiveIdx").on(table.isActive),
  ]
);

/**
 * Defines types of attributes products can have
 * @example 
 * - Color
 * - Storage Capacity
 * - Size
 * - Material
 */
export const attributes = pgTable(
  "attributes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("attributeName", { length: 100 }).notNull().unique(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("attributesNameIdx").on(table.name),
    uniqueIndex("attributesSlugIdx").on(table.slug),
  ]
);

/**
 * Possible values for each attribute type
 * @example 
 * - Color → ["Black", "White", "Blue"]
 * - Storage → ["128GB", "256GB", "512GB"]
 * - Size → ["S", "M", "L"]
 */
export const attributeValues = pgTable(
  "attributeValues",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    attributeId: uuid("attributeId")
      .notNull()
      .references(() => attributes.id, { onDelete: "restrict" }),
    value: varchar("attributeValue", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }),
    otherData: jsonb("otherData"), // colorHex // Example: if attribute is 'Color'
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("attributeValuesAttrIdValueIdx").on(
      table.attributeId,
      table.value
    ),
    index("attributeValuesAttrIdIdx").on(table.attributeId),
    index("attributeValuesSlugIdx").on(table.slug),
  ]
);

/**
 * Associates attributes with specific categories
 * @example 
 * - Mobiles: [Color, Storage, RAM]
 * - Shirts: [Color, Size, Material]
 */
export const categoryAttributes = pgTable(
  "categoryAttributes",
  {
    categoryId: uuid("categoryId").references(() => categories.categoryId),
    attributeId: uuid("attributeId").references(() => attributes.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.categoryId, table.attributeId] }),
  })
);

/**
 * Associates attributes with specific products
 * @example 
 * - iPhone 15: [Color, Storage, RAM]
 * - T-Shirt: [Color, Size, Material]
 */
export const productAttributes = pgTable(
  "productAttributes",
  {
    productAttributeId: uuid("productAttributeId").defaultRandom().primaryKey(),
    productId: uuid("productId")
      .notNull()
      .references(() => products.productId, { onDelete: "cascade" }),
    attributeId: uuid("attributeId")
      .notNull()
      .references(() => attributes.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    isRequired: boolean("isRequired").default(false),
    displayOrder: integer("displayOrder"),
  },
  (table) => ({
    // Unique constraint from image: UNIQUE(productId, attributeId)
    productAttributeIndex: uniqueIndex("productAttributesProdAttrIdx").on(
      table.productId,
      table.attributeId
    ),
    productIdIndex: index("productAttributesProdIdIdx").on(table.productId),
    attributeIdIndex: index("productAttributesAttrIdIdx").on(table.attributeId),
  })
);

/**
 * Defines which attribute values are available for each product attribute
 * @example 
 * - iPhone 15 Color: [Black, White, Blue]
 * - iPhone 15 Storage: [128GB, 256GB, 512GB]
 */
export const productAttributeValues = pgTable(
  "productAttributeValues",
  {
    productAttributeValueId: uuid("productAttributeValueId")
      .defaultRandom()
      .primaryKey(),
    productAttributeId: uuid("productAttributeId")
      .notNull()
      .references(() => productAttributes.productAttributeId, {
        onDelete: "cascade",
      }),
    attributeValueId: uuid("attributeValueId")
      .notNull()
      .references(() => attributeValues.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("productAttrValuesProdAttrValIdx").on(
      table.productAttributeId,
      table.attributeValueId
    ),
    index("productAttrValuesProdAttrIdIdx").on(table.productAttributeId),
    index("productAttrValuesAttrValIdIdx").on(table.attributeValueId),
  ]
);

/**
 * Represents specific product variants with unique combinations of attributes
 * @example 
 * - iPhone 15 Pro Max (Gold, 256GB)
 * - MacBook Pro M3 (Space Gray, 16GB RAM, 1TB SSD)
 * - T-Shirt (Black, XL)
 */
export const productVariants = pgTable(
  "productVariants",
  {
    productVariantId: uuid("productVariantId").defaultRandom().primaryKey(),
    productId: uuid("productId")
      .notNull()
      .references(() => products.productId, { onDelete: "cascade" }),
    sku: varchar("sku", { length: 100 }).unique(),
    stockQuantity: integer("stockQuantity").notNull().default(0),
    price: decimal("price", { precision: 10, scale: 2 })
      .notNull()
      .$type<number>()
      .default(0),
    isDefault: boolean("isDefault").notNull().default(false),
    isActive: boolean("isActive").notNull().default(true),
    productMedia: jsonb("productMedia"),
    otherData: jsonb("otherData"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    skuIndex: uniqueIndex("productVariantsSkuIdx").on(table.sku),
    productIdIndex: index("productVariantsProductIdIdx").on(table.productId),
    // Index to quickly find default variant
    defaultVariantIndex: index("productVariantsDefaultIdx")
      .on(table.productId, table.isDefault)
      .where(sql`${table.isDefault} = true`),
  })
);

/**
 * Links variants to their specific attribute value combinations
 * @example 
 * - Variant A: [Color=Black, Storage=256GB]
 * - Variant B: [Color=White, Storage=256GB]
 */
export const productVariantAttributeValues = pgTable(
  "productVariantAttributeValues",
  {
    productVariantId: uuid("productVariantId")
      .notNull()
      .references(() => productVariants.productVariantId, {
        onDelete: "cascade",
      }),
    productAttributeValueId: uuid("productAttributeValueId")
      .notNull()
      .references(() => productAttributeValues.productAttributeValueId, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Composite primary key ensures a variant only has one value per attribute type (implicitly via attributeValueId)
    primaryKey({
      columns: [table.productVariantId, table.productAttributeValueId],
    }),
    index("pvavVariantIdIdx").on(table.productVariantId),
    index("pvavValueIdIdx").on(table.productAttributeValueId),
  ]
);

/**
 * Tracks historical price changes for product variants
 * @example 
 * - Variant A was $999 from Jan-Mar 2023
 * - Variant A changed to $899 from Apr 2023 onward
 */
export const priceHistory = pgTable("priceHistory", {
  id: uuid("id").defaultRandom().primaryKey(),
  variantId: uuid("variantId").references(
    () => productVariants.productVariantId
  ),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  salePrice: decimal("salePrice", { precision: 10, scale: 2 }).notNull(),
  effectiveFrom: timestamp("effectiveFrom", {
    withTimezone: true,
  }).defaultNow(),
  effectiveTo: timestamp("effectiveTo", { withTimezone: true }),
  history: jsonb("history"),
  // todo userId
  updatedBy: uuid("updatedBy").references(() => users.userId),
});

