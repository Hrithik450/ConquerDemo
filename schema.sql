CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users(
    "userId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "firstName" VARCHAR(100),
    "lastName" VARCHAR(100),
    "phone" VARCHAR(20),
    "role" VARCHAR(20) NOT NULL DEFAULT 'employee',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX "usersEmailIdx" on users("email");
CREATE INDEX "usersRoleIdx" on users("role");

CREATE TABLE categories(
    "categoryId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "description" TEXT,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "otherData" JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX "categorySlugIdx" ON categories("slug");
CREATE INDEX "categoryIsActiveIdx" ON categories("isActive");

CREATE TABLE brands(
    "brandId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "description" TEXT,
    "logoUrl" TEXT,
    "websiteUrl" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX "brandSlugIdx" ON brands("slug");

CREATE TABLE "brandCategories"(
    "brandId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "brandCategoryName" VARCHAR,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
    PRIMARY KEY ("brandId", "categoryId"),
    FOREIGN KEY ("brandId") REFERENCES brands("brandId") ON DELETE CASCADE,
    FOREIGN KEY ("categoryId") REFERENCES categories("categoryId") ON DELETE CASCADE
);

CREATE TABLE products(
    "productId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "description" TEXT,
    "basePrice" DECIMAL(10, 2),
    "brandId" UUID NOT NULL,
    "categoryId" UUID NOT NULL REFERENCES categories("categoryId"),
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "primaryImageUrl" TEXT,
    "otherData" JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    FOREIGN KEY ("brandId") REFERENCES brands("brandId") ON DELETE RESTRICT,
    FOREIGN KEY ("categoryId") REFERENCES categories("categoryId") ON DELETE RESTRICT
);

CREATE UNIQUE INDEX "productsSlugIdx" ON products("slug");
CREATE INDEX "productsBrandIdIdx" ON products("brandId");
CREATE INDEX "productsCategoryIdIdx" ON products("categoryId");
CREATE INDEX "productsIsActiveIdx" ON products("isActive");

CREATE TABLE attributes(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL UNIQUE,
    "slug" VARCHAR(100) NOT NULL UNIQUE,
    "description" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX "attributesNameIdx" ON attributes("name");
CREATE UNIQUE INDEX "attributesSlugIdx" ON attributes("slug");

CREATE TABLE "attributeValues"(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "attributeId" UUID NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "otherData" JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    FOREIGN KEY ("attributeId") REFERENCES attributes("id") ON DELETE RESTRICT
);

CREATE UNIQUE INDEX "attributeValuesAttrIdValueIdx" ON "attributeValues"("attributeId", "value");
CREATE INDEX "attributeValuesAttrIdIdx" ON "attributeValues"("attributeId");
CREATE INDEX "attributeValuesSlugIdx" ON "attributeValues"("slug");

CREATE TABLE "productAttributes"(
    "productAttributeId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "attributeId" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "isRequired" BOOLEAN DEFAULT FALSE,
    "displayOrder" INT,
    FOREIGN KEY ("productId") REFERENCES products("productId") ON DELETE CASCADE,
    FOREIGN KEY ("attributeId") REFERENCES attributes("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX "productAttributesProdAttrIdx" ON "productAttributes"("productId" , "attributeId");
CREATE INDEX "productAttributesProdIdIdx" ON "productAttributes"("productId");
CREATE INDEX "productAttributesAttrIdIdx" ON "productAttributes"("attributeId");

CREATE TABLE "productAttributeValues"(
    "productAttributeValueId" UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    "productAttributeId" UUID NOT NULL,
    "attributeValueId" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    FOREIGN KEY ("productAttributeId") REFERENCES "productAttributes"("productAttributeId") ON DELETE CASCADE,
    FOREIGN KEY ("attributeValueId") REFERENCES "attributeValues"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX "productAttrValuesProdAttrValIdx" ON "productAttributeValues"("productAttributeId" , "attributeValueId");
CREATE INDEX "productAttrValuesProdAttrIdIdx" ON "productAttributeValues"("productAttributeId");
CREATE INDEX "productAttrValuesAttrValIdIdx" ON "productAttributeValues"("attributeValueId");

CREATE TABLE "productVariants"(
    "productVariantId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "sku" VARCHAR(100) UNIQUE,
    "stockQuantity" INT NOT NULL DEFAULT 0,
    "price" DECIMAL(10, 2) NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT FALSE,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "productMedia" JSONB,
    "otherData" JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    FOREIGN KEY ("productId") REFERENCES products("productId") ON DELETE CASCADE
);

CREATE UNIQUE INDEX "productVariantsSkuIdx" ON "productVariants"("sku");
CREATE INDEX "productVariantsProductIdIdx" ON "productVariants"("productId");
CREATE INDEX "productVariantsDefaultIdx" ON "productVariants"("productId", "isDefault") WHERE "isDefault" = TRUE;

CREATE TABLE "productVariantAttributeValues"(
    "productVariantId" UUID NOT NULL,
    "productAttributeValueId" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY ("productVariantId", "productAttributeValueId"),
    FOREIGN KEY ("productVariantId") REFERENCES "productVariants"("productVariantId") ON DELETE CASCADE,
    FOREIGN KEY ("productAttributeValueId") REFERENCES "productAttributeValues"("productAttributeValueId") ON DELETE CASCADE
);

CREATE INDEX "pvavVariantIdIdx" ON "productVariantAttributeValues"("productVariantId");
CREATE INDEX "pvavValueIdIdx" ON "productVariantAttributeValues"("productAttributeValueId");


CREATE TABLE organizations(
  "organizationId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "taxId" VARCHAR(50) UNIQUE,
  "email" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(20),
  "address" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "contractStartDate" TIMESTAMP WITH TIME ZONE,
  "contractEndDate" TIMESTAMP WITH TIME ZONE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX "organizationsNameIdx" ON organizations("name");
CREATE INDEX "organizationsActiveIdx" ON organizations("isActive");

CREATE TABLE "organizationEmployees" (
  "employeeId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organizationId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "employeeNumber" VARCHAR(50),
  "department" VARCHAR(100),
  "position" VARCHAR(100),
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   FOREIGN KEY ("organizationId") REFERENCES organizations("organizationId"),
   FOREIGN KEY ("userId") REFERENCES users("userId") 
);

CREATE UNIQUE INDEX "orgEmployeesOrgUserIdx" ON "organizationEmployees"("organizationId", "userId");
CREATE INDEX "orgEmployeesOrgIdx" ON "organizationEmployees"("organizationId");
CREATE INDEX "orgEmployeesUserIdx" ON "organizationEmployees"("userId");

CREATE TABLE contracts(
  "contractId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organizationId" UUID NOT NULL,
  "contractNumber" VARCHAR(50),
  "startDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "endDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "terms" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX "contractsOrgIdx" ON contracts("organizationId");
CREATE INDEX "contractsActiveIdx" ON contracts("isActive");
CREATE INDEX "contractsDateRangeIdx" ON contracts("startDate", "endDate");

CREATE TABLE "contractProductDiscounts"(
  "discountId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contractId" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "discountType" VARCHAR(20) NOT NULL,
  "discountValue" DECIMAL(5, 2) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY ("contractId") REFERENCES contracts("contractId"),
  FOREIGN KEY ("productId") REFERENCES products("productId")
);

CREATE UNIQUE INDEX "contractProductDiscountsUniqueIdx" ON "contractProductDiscounts"("contractId", "productId");
CREATE INDEX "contractProductDiscountsContractIdx" ON "contractProductDiscounts"("contractId");
CREATE INDEX "contractProductDiscountsProductIdx" ON "contractProductDiscounts"("productId");

CREATE TABLE "contractProductAttributeValueRestrictions" (
  "restrictionId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contractId" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "attributeId" UUID NOT NULL,
  "attributeValueId" UUID NOT NULL,
  "isAllowed" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY ("contractId") REFERENCES contracts("contractId"),
  FOREIGN KEY ("productId") REFERENCES products("productId"),
  FOREIGN KEY ("attributeId") REFERENCES attributes("id"),
  FOREIGN KEY ("attributeValueId") REFERENCES "attributeValues"("id")
);

CREATE UNIQUE INDEX "contractProdAttrValRestrictionUniqueIdx"
  ON "contractProductAttributeValueRestrictions" (
    "contractId",
    "productId",
    "attributeId",
    "attributeValueId"
  );
CREATE INDEX "contractProdAttrValRestrictionContractIdx" ON "contractProductAttributeValueRestrictions" ("contractId");
CREATE INDEX "contractProdAttrValRestrictionProductIdx" ON "contractProductAttributeValueRestrictions" ("productId");
CREATE INDEX "contractProdAttrValRestrictionAttrIdx" ON "contractProductAttributeValueRestrictions" ("attributeId");
CREATE INDEX "contractProdAttrValRestrictionValueIdx" ON "contractProductAttributeValueRestrictions" ("attributeValueId");

CREATE TABLE "contractCategoryDiscounts"(
  "discountId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contractId" UUID NOT NULL,
  "categoryId" UUID NOT NULL,
  "discountType" VARCHAR(20) NOT NULL,
  "discountValue" DECIMAL(5, 2) NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  FOREIGN KEY ("contractId")  REFERENCES contracts("contractId"),
  FOREIGN KEY ("categoryId") REFERENCES categories("categoryId")
);

CREATE UNIQUE INDEX "contractCategoryDiscountsUniqueIdx"
  ON "contractCategoryDiscounts"("contractId", "categoryId");
CREATE INDEX "contractCategoryDiscountsContractIdx"
  ON "contractCategoryDiscounts"("contractId");
CREATE INDEX "contractCategoryDiscountsCategoryIdx"
  ON "contractCategoryDiscounts"("categoryId");


CREATE TABLE "contractBrandDiscounts"(
  "discountId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "contractId" UUID NOT NULL,
  "brandId" UUID NOT NULL,
  "discountType" VARCHAR(20) NOT NULL,
  "discountValue" DECIMAL(5, 2) NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  FOREIGN KEY ("contractId") REFERENCES contracts("contractId"),
  FOREIGN KEY ("brandId") REFERENCES brands("brandId")
);

CREATE UNIQUE INDEX "contractBrandDiscountsUniqueIdx"
  ON "contractBrandDiscounts"("contractId", "brandId");
CREATE INDEX "contractBrandDiscountsContractIdx"
  ON "contractBrandDiscounts"("contractId");
CREATE INDEX "contractBrandDiscountsBrandIdx"
  ON "contractBrandDiscounts"("brandId");

CREATE TABLE "categoryAttributes"(
  "categoryId" UUID,
  "attributeId" UUID,
  PRIMARY KEY ("categoryId", "attributeId"),
  FOREIGN KEY ("categoryId") REFERENCES categories("categoryId"),
  FOREIGN KEY ("attributeId") REFERENCES attributes("id")
);

CREATE TABLE "orders" (
  "orderId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "orderNumber" VARCHAR(50) NOT NULL UNIQUE,
  "userId" UUID NOT NULL,
  "organizationId" UUID NOT NULL,
  "contractId" UUID NOT NULL,
  "totalAmount" DECIMAL(10,2) NOT NULL,
  "totalDiscount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
  "shippingAddress" TEXT,
  "billingAddress" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  FOREIGN KEY ("userId") REFERENCES users("userId"),
  FOREIGN KEY ("organizationId") REFERENCES organizations("organizationId"),
  FOREIGN KEY ("contractId") REFERENCES contracts("contractId")
);

CREATE INDEX "ordersUserIdx" ON "orders"("userId");
CREATE INDEX "ordersOrgIdx" ON "orders"("organizationId");
CREATE INDEX "ordersContractIdx" ON "orders"("contractId");
CREATE INDEX "ordersStatusIdx" ON "orders"("status");
CREATE INDEX "ordersDateIdx" ON "orders"("createdAt");

CREATE TABLE "orderItems"(
  "orderItemId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "orderId" UUID NOT NULL,
  "productVariantId" UUID NOT NULL,
  "quantity" INTEGER NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "totalPrice" DECIMAL(10,2) NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  FOREIGN KEY ("orderId") REFERENCES "orders"("orderId"),
  FOREIGN KEY ("productVariantId") REFERENCES "productVariants"("productVariantId")
);

CREATE INDEX "orderItemsOrderIdx" ON "orderItems"("orderId");
CREATE INDEX "orderItemsVariantIdx" ON "orderItems"("productVariantId");

CREATE TABLE "orderStatusHistory"(
  "historyId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "orderId" UUID NOT NULL,
  "status" VARCHAR(20) NOT NULL,
  "changedBy" UUID,
  "notes" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  FOREIGN KEY ("orderId") REFERENCES orders("orderId"),
  FOREIGN KEY ("changedBy") REFERENCES users("userId") 
);

CREATE INDEX "orderStatusHistoryOrderIdx" ON "orderStatusHistory"("orderId");
CREATE INDEX "orderStatusHistoryStatusIdx" ON "orderStatusHistory"("status");
CREATE INDEX "orderStatusHistoryDateIdx" ON "orderStatusHistory"("createdAt");

CREATE TABLE "priceHistory"(
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "variantId" UUID,
  "price" DECIMAL(10, 2) NOT NULL,
  "salePrice" DECIMAL(10, 2) NOT NULL,
  "effectiveFrom" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "effectiveTo" TIMESTAMP WITH TIME ZONE,
  "history" JSONB,
  "updatedBy" UUID,
  FOREIGN KEY ("variantId") REFERENCES "productVariants"("productVariantId"),
  FOREIGN KEY ("updatedBy") REFERENCES users("userId")
);

CREATE TABLE "cartItems"(
  "cartItemId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "cartId" UUID NOT NULL REFERENCES carts("cartId"),
  "productVariantId" UUID NOT NULL REFERENCES productVariants("productVariantId"),
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "priceAtAddition" DECIMAL(10, 2) NOT NULL,
  "appliedDiscount" DECIMAL(10, 2) DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX "cartItemsCartIdx" ON "cartItems" ("cartId");
CREATE INDEX "cartItemsVariantIdx" ON "cartItems" ("productVariantId");