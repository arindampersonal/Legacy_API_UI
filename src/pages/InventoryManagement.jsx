import CollectionPage from "./CollectionPage";
import { inventoryManagementCollection } from "@/data/apiCollections";

export default function InventoryManagement() {
  return <CollectionPage collection={inventoryManagementCollection} />;
}
