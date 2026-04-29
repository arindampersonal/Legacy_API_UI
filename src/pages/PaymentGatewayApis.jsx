import CollectionPage from "./CollectionPage";
import { paymentGatewayCollection } from "@/data/apiCollections";

export default function PaymentGatewayApis() {
  return <CollectionPage collection={paymentGatewayCollection} />;
}
