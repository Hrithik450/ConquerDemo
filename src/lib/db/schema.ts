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

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
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

export const brands = pgTable(
  "brands",
  {
    id: uuid("id").defaultRandom().primaryKey(),
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

export const brandCategories = pgTable(
  "brandCategories",
  {
    brandId: uuid("brandId")
      .notNull()
      .references(() => brands.id, { onDelete: "cascade" }),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
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

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    // Base price might be useful, or rely solely on variant prices
    basePrice: decimal("basePrice", { precision: 10, scale: 2 }),
    brandId: uuid("brandId")
      .notNull()
      .references(() => brands.id, { onDelete: "restrict" }),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
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

export const attributes = pgTable(
  "attributes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    attributeName: varchar("attributeName", { length: 100 }).notNull().unique(),
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
    uniqueIndex("attributesNameIdx").on(table.attributeName),
    uniqueIndex("attributesSlugIdx").on(table.slug),
  ]
);

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

export const productAttributes = pgTable('productAttributes', {
  productAttributeId: uuid('productAttributeId').defaultRandom().primaryKey(), 
  productId: uuid('productId').notNull().references(() => products.id, { onDelete: 'cascade' }),
  attributeId: uuid('attributeId').notNull().references(() => attributes.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
  displayOrder: integer('displayOrder')
}, (table) => ({
  // Unique constraint from image: UNIQUE(productId, attributeId)
  productAttributeIndex: uniqueIndex('productAttributesProdAttrIdx').on(table.productId, table.attributeId),
  productIdIndex: index('productAttributesProdIdIdx').on(table.productId),
  attributeIdIndex: index('productAttributesAttrIdIdx').on(table.attributeId),
}));


export const productVariants = pgTable('productVariants', {
  productVariantId: uuid('productVariantId').defaultRandom().primaryKey(), 
  productId: uuid('productId').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sku: varchar('sku', { length: 100 }).unique(), 
  stockQuantity: integer('stockQuantity').notNull().default(0),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), 
  isDefault: boolean('isDefault').notNull().default(false), 
  imageUrls: jsonb('imageUrls'), 
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  skuIndex: uniqueIndex('productVariantsSkuIdx').on(table.sku),
  productIdIndex: index('productVariantsProductIdIdx').on(table.productId),
  // Index to quickly find default variant
  defaultVariantIndex: index('productVariantsDefaultIdx').on(table.productId, table.isDefault).where(sql`${table.isDefault} = true`),
}));

export const productVariantAttributeValues = pgTable('productVariantAttributeValues', {
  // id: uuid('id').defaultRandom().primaryKey(), // Use composite key instead usually
  // variantAttributeId: uuid('variantAttributeId'), // This field name from image is unclear, using composite PK
  productVariantId: uuid('productVariantId').notNull().references(() => productVariants.productVariantId, { onDelete: 'cascade' }),
  attributeValueId: uuid('attributeValueId').notNull().references(() => attributeValues.id, { onDelete: 'cascade' }), // 'productAttributeValueId' in image seems to mean this FK
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  // Composite primary key ensures a variant only has one value per attribute type (implicitly via attributeValueId)
  // Also matches UNIQUE constraint from image: UNIQUE(productVariantId, attributeValueId) <- Interpreted from image fields
  pk: primaryKey({ columns: [table.productVariantId, table.attributeValueId] }),
  variantIdIndex: index('pvavVariantIdIdx').on(table.productVariantId),
  valueIdIndex: index('pvavValueIdIdx').on(table.attributeValueId),
}));
