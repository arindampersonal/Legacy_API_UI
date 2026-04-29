export const paymentGatewayCollection = {
  id: "payment-gateway",
  name: "Payment Gateway APIs",
  subtitle: "Legacy payment capture, refund, and settlement services",
  endpoint: "/payments/transactions",
  method: "POST",
  description:
    "Normalize payment processor responses, annotate transaction rules, and document settlement behavior for older gateway integrations.",
  endpoints: [
    "POST /payments/charge",
    "GET /payments/status/{transactionId}",
    "POST /payments/refund",
  ],
  responseType: "Payment transaction JSON",
  mappedFields: ["transaction_id", "amount", "currency", "gateway_status"],
  insights: [
    "PCI-sensitive headers should be masked",
    "Retry behavior documented for failed captures",
    "AI inference confidence: 89%",
  ],
};

export const legacyHrmsCollection = {
  id: "legacy-hrms",
  name: "Legacy HRMS APIs",
  subtitle: "Employee, payroll, and attendance services",
  endpoint: "/employee/details",
  method: "GET",
  description:
    "Document HRMS employee payloads, deprecated authentication patterns, and downstream field mappings for internal workforce systems.",
  endpoints: [
    "GET /employee/details",
    "GET /employee/payroll/{employeeId}",
    "POST /attendance/sync",
  ],
  responseType: "Employee profile JSON",
  mappedFields: ["employee_id", "department", "designation", "manager_id"],
  insights: [
    "Backward compatibility maintained",
    "No production API changes required",
    "AI inference confidence: 92%",
  ],
};

export const inventoryManagementCollection = {
  id: "inventory-management",
  name: "Inventory Management",
  subtitle: "Stock, warehouse, and reorder legacy APIs",
  endpoint: "/inventory/items",
  method: "GET",
  description:
    "Generate comments for inventory lookup, stock transfer, and reorder APIs that still return inconsistent warehouse payloads.",
  endpoints: [
    "GET /inventory/items",
    "POST /inventory/transfer",
    "GET /inventory/reorder-alerts",
  ],
  responseType: "Inventory item JSON",
  mappedFields: ["sku", "warehouse_id", "available_qty", "reorder_level"],
  insights: [
    "Warehouse codes normalized",
    "Negative stock edge cases identified",
    "AI inference confidence: 90%",
  ],
};

export const customErpCollection = {
  id: "custom-erp",
  name: "Custom ERP Services",
  subtitle: "Order, invoice, vendor, and finance integrations",
  endpoint: "/erp/orders",
  method: "PUT",
  description:
    "Map custom ERP service responses into readable contracts and explain legacy business rules for order and invoice flows.",
  endpoints: [
    "PUT /erp/orders",
    "GET /erp/invoices/{invoiceId}",
    "POST /erp/vendors/sync",
  ],
  responseType: "ERP workflow JSON",
  mappedFields: ["order_id", "vendor_code", "invoice_status", "approval_step"],
  insights: [
    "Custom status codes documented",
    "Vendor sync dependencies detected",
    "AI inference confidence: 87%",
  ],
};
