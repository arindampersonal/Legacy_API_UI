import CollectionPage from "./CollectionPage";
import { legacyHrmsCollection } from "@/data/apiCollections";

export default function LegacyHrmsApis() {
  return <CollectionPage collection={legacyHrmsCollection} />;
}
