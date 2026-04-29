import {
  customErpCollection,
  inventoryManagementCollection,
  legacyHrmsCollection,
  paymentGatewayCollection,
} from "@/data/apiCollections";
import CustomErpServices from "./CustomErpServices";
import InventoryManagement from "./InventoryManagement";
import LegacyHrmsApis from "./LegacyHrmsApis";
import PaymentGatewayApis from "./PaymentGatewayApis";

export const apiCollectionPages = [
  {
    ...paymentGatewayCollection,
    Component: PaymentGatewayApis,
  },
  {
    ...legacyHrmsCollection,
    Component: LegacyHrmsApis,
  },
  {
    ...inventoryManagementCollection,
    Component: InventoryManagement,
  },
  {
    ...customErpCollection,
    Component: CustomErpServices,
  },
];
