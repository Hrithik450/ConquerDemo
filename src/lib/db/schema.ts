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
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("userId").defaultRandom().notNull().unique(),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    firstName: text("firstName"),
    lastName: text("lastName"),
    phone: text("phone"),
    role: text("role", { enum: ["user", "admin", "superadmin"] })
      .default("user")
      .notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => ({
    emailIndex: uniqueIndex("usersEmailIdx").on(table.email),
    roleIndex: index("usersRoleIdx").on(table.role),
  })
);

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.userId, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.provider, table.providerAccountId],
    }),
  })
);

export const sessions = pgTable(
  "sessions",
  {
    sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.userId, { onDelete: "cascade" }),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => ({
    userIdIdx: index("sessions_userId_idx").on(table.userId),
  })
);

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => ({
    compoundKey: primaryKey({ columns: [table.identifier, table.token] }),
  })
);

/**
 * Organizations that have partnerships with us
 */
export const organizations = pgTable(
  "organizations",
  {
    organizationId: uuid("organizationId").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    taxId: varchar("taxId", { length: 50 }).unique(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    address: text("address"),
    isActive: boolean("isActive").notNull().default(true),
    contractStartDate: timestamp("contractStartDate", { withTimezone: true }),
    contractEndDate: timestamp("contractEndDate", { withTimezone: true }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    nameIndex: uniqueIndex("organizationsNameIdx").on(table.name),
    activeIndex: index("organizationsActiveIdx").on(table.isActive),
  })
);

/**
 * Employees of partner organizations who can make purchases
 */
export const organizationEmployees = pgTable(
  "organizationEmployees",
  {
    employeeId: uuid("employeeId").defaultRandom().primaryKey(),
    organizationId: uuid("organizationId")
      .notNull()
      .references(() => organizations.organizationId),
    userId: uuid("userId")
      .notNull()
      .references(() => users.userId),
    employeeNumber: varchar("employeeNumber", { length: 50 }),
    department: varchar("department", { length: 100 }),
    position: varchar("position", { length: 100 }),
    isActive: boolean("isActive").notNull().default(true),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    orgUserIndex: uniqueIndex("orgEmployeesOrgUserIdx").on(
      table.organizationId,
      table.userId
    ),
    orgIndex: index("orgEmployeesOrgIdx").on(table.organizationId),
    userIndex: index("orgEmployeesUserIdx").on(table.userId),
  })
);

/**
 * Contracts between our company and partner organizations
 */
export const contracts = pgTable(
  "contracts",
  {
    contractId: uuid("contractId").defaultRandom().primaryKey(),
    organizationId: uuid("organizationId")
      .notNull()
      .references(() => organizations.organizationId),
    contractNumber: varchar("contractNumber", { length: 50 }),
    startDate: timestamp("startDate", { withTimezone: true }).notNull(),
    endDate: timestamp("endDate", { withTimezone: true }).notNull(),
    isActive: boolean("isActive").notNull().default(true),
    terms: text("terms"),
    notes: text("notes"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    orgIndex: index("contractsOrgIdx").on(table.organizationId),
    activeIndex: index("contractsActiveIdx").on(table.isActive),
    dateRangeIndex: index("contractsDateRangeIdx").on(
      table.startDate,
      table.endDate
    ),
  })
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
    otherData: jsonb("otherData"),
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
 * - Apple → Mobiles - iphones
 * - Apple → Laptops - macbooks
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
    productMedia: jsonb("productMedia"),
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
    name: varchar("name", { length: 100 }).notNull().unique(),
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
    value: varchar("value", { length: 255 }).notNull(),
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
 * Contract-specific discounts for product categories
 */
export const contractCategoryDiscounts = pgTable(
  "contractCategoryDiscounts",
  {
    discountId: uuid("discountId").defaultRandom().primaryKey(),
    contractId: uuid("contractId")
      .notNull()
      .references(() => contracts.contractId),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => categories.categoryId),
    discountType: varchar("discountType", { length: 20 }).notNull(), // 'percentage' or 'fixed'
    discountValue: decimal("discountValue", {
      precision: 5,
      scale: 2,
    }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    contractCategoryIndex: uniqueIndex("contractCategoryDiscountsUniqueIdx").on(
      table.contractId,
      table.categoryId
    ),
    contractIndex: index("contractCategoryDiscountsContractIdx").on(
      table.contractId
    ),
    categoryIndex: index("contractCategoryDiscountsCategoryIdx").on(
      table.categoryId
    ),
  })
);

/**
 * Contract-specific discounts for brands
 */
export const contractBrandDiscounts = pgTable(
  "contractBrandDiscounts",
  {
    discountId: uuid("discountId").defaultRandom().primaryKey(),
    contractId: uuid("contractId")
      .notNull()
      .references(() => contracts.contractId),
    brandId: uuid("brandId")
      .notNull()
      .references(() => brands.brandId),
    discountType: varchar("discountType", { length: 20 }).notNull(), // 'percentage' or 'fixed'
    discountValue: decimal("discountValue", {
      precision: 5,
      scale: 2,
    }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    contractBrandIndex: uniqueIndex("contractBrandDiscountsUniqueIdx").on(
      table.contractId,
      table.brandId
    ),
    contractIndex: index("contractBrandDiscountsContractIdx").on(
      table.contractId
    ),
    brandIndex: index("contractBrandDiscountsBrandIdx").on(table.brandId),
  })
);

/**
 * Contract-specific discounts for individual products
 */
export const contractProductDiscounts = pgTable(
  "contractProductDiscounts",
  {
    discountId: uuid("discountId").defaultRandom().primaryKey(),
    contractId: uuid("contractId")
      .notNull()
      .references(() => contracts.contractId),
    productId: uuid("productId")
      .notNull()
      .references(() => products.productId),
    discountType: varchar("discountType", { length: 20 }).notNull(), // 'percentage' or 'fixed'
    discountValue: decimal("discountValue", {
      precision: 5,
      scale: 2,
    }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    contractProductIndex: uniqueIndex("contractProductDiscountsUniqueIdx").on(
      table.contractId,
      table.productId
    ),
    contractIndex: index("contractProductDiscountsContractIdx").on(
      table.contractId
    ),
    productIndex: index("contractProductDiscountsProductIdx").on(
      table.productId
    ),
  })
);

/**
 * Contract restrictions on product-specific attribute values
 */
export const contractProductAttributeValueRestrictions = pgTable(
  "contractProductAttributeValueRestrictions",
  {
    restrictionId: uuid("restrictionId").defaultRandom().primaryKey(),
    contractId: uuid("contractId")
      .notNull()
      .references(() => contracts.contractId),
    productId: uuid("productId")
      .notNull()
      .references(() => products.productId),
    attributeId: uuid("attributeId")
      .notNull()
      .references(() => attributes.id),
    attributeValueId: uuid("attributeValueId")
      .notNull()
      .references(() => attributeValues.id),
    isAllowed: boolean("isAllowed").notNull().default(true),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    contractProductAttributeValueIndex: uniqueIndex(
      "contractProdAttrValRestrictionUniqueIdx"
    ).on(
      table.contractId,
      table.productId,
      table.attributeId,
      table.attributeValueId
    ),
    contractIndex: index("contractProdAttrValRestrictionContractIdx").on(
      table.contractId
    ),
    productIndex: index("contractProdAttrValRestrictionProductIdx").on(
      table.productId
    ),
    attributeIndex: index("contractProdAttrValRestrictionAttrIdx").on(
      table.attributeId
    ),
    valueIndex: index("contractProdAttrValRestrictionValueIdx").on(
      table.attributeValueId
    ),
  })
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

/**
 * Customer shopping carts
 */
export const carts = pgTable(
  "carts",
  {
    cartId: uuid("cartId").defaultRandom().primaryKey(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.userId),
    organizationId: uuid("organizationId")
      .notNull()
      .references(() => organizations.organizationId),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIndex: index("cartsUserIdx").on(table.userId),
    orgIndex: index("cartsOrgIdx").on(table.organizationId),
  })
);

/**
 * Items in shopping carts
 */
export const cartItems = pgTable(
  "cartItems",
  {
    cartItemId: uuid("cartItemId").defaultRandom().primaryKey(),
    cartId: uuid("cartId")
      .notNull()
      .references(() => carts.cartId),
    productVariantId: uuid("productVariantId")
      .notNull()
      .references(() => productVariants.productVariantId),
    quantity: integer("quantity").notNull().default(1),
    priceAtAddition: decimal("priceAtAddition", {
      precision: 10,
      scale: 2,
    }).notNull(),
    appliedDiscount: decimal("appliedDiscount", { precision: 10, scale: 2 })
      .$type<number>()
      .default(0),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    cartIndex: index("cartItemsCartIdx").on(table.cartId),
    variantIndex: index("cartItemsVariantIdx").on(table.productVariantId),
  })
);

//wishlist to be addd //todo

/**
 * Customer orders
 */
export const orders = pgTable(
  "orders",
  {
    orderId: uuid("orderId").defaultRandom().primaryKey(),
    orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.userId),
    organizationId: uuid("organizationId")
      .notNull()
      .references(() => organizations.organizationId),
    contractId: uuid("contractId")
      .notNull()
      .references(() => contracts.contractId),
    totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
    totalDiscount: decimal("totalDiscount", { precision: 10, scale: 2 })
      .notNull()
      .$type<number>()
      .default(0),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, processing, shipped, delivered, cancelled
    shippingAddress: text("shippingAddress"),
    billingAddress: text("billingAddress"),
    notes: text("notes"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIndex: index("ordersUserIdx").on(table.userId),
    orgIndex: index("ordersOrgIdx").on(table.organizationId),
    contractIndex: index("ordersContractIdx").on(table.contractId),
    statusIndex: index("ordersStatusIdx").on(table.status),
    dateIndex: index("ordersDateIdx").on(table.createdAt),
  })
);


// addreses table. 

/**
 * Order items
 */
export const orderItems = pgTable(
  "orderItems",
  {
    orderItemId: uuid("orderItemId").defaultRandom().primaryKey(),
    orderId: uuid("orderId")
      .notNull()
      .references(() => orders.orderId),
    productVariantId: uuid("productVariantId")
      .notNull()
      .references(() => productVariants.productVariantId),
    quantity: integer("quantity").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    discount: decimal("discount", { precision: 10, scale: 2 })
      .notNull()
      .$type<number>()
      .default(0),
    totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    orderIndex: index("orderItemsOrderIdx").on(table.orderId),
    variantIndex: index("orderItemsVariantIdx").on(table.productVariantId),
  })
);

/**
 * Order status history
 */
export const orderStatusHistory = pgTable(
  "orderStatusHistory",
  {
    historyId: uuid("historyId").defaultRandom().primaryKey(),
    orderId: uuid("orderId")
      .notNull()
      .references(() => orders.orderId),
    status: varchar("status", { length: 20 }).notNull(),
    changedBy: uuid("changedBy").references(() => users.userId),
    notes: text("notes"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    orderIndex: index("orderStatusHistoryOrderIdx").on(table.orderId),
    statusIndex: index("orderStatusHistoryStatusIdx").on(table.status),
    dateIndex: index("orderStatusHistoryDateIdx").on(table.createdAt),
  })
);

/**
 * Admin audit logs
 */
export const auditLogs = pgTable(
  "auditLogs",
  {
    logId: uuid("logId").defaultRandom().primaryKey(),
    action: varchar("action", { length: 50 }).notNull(), // create, update, delete
    entityType: varchar("entityType", { length: 50 }).notNull(), // product, order, etc.
    entityId: uuid("entityId"),
    userId: uuid("userId")
      .notNull()
      .references(() => users.userId),
    oldValues: jsonb("oldValues"),
    newValues: jsonb("newValues"),
    ipAddress: varchar("ipAddress", { length: 50 }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIndex: index("auditLogsUserIdx").on(table.userId),
    entityIndex: index("auditLogsEntityIdx").on(
      table.entityType,
      table.entityId
    ),
    dateIndex: index("auditLogsDateIdx").on(table.createdAt),
  })
);
