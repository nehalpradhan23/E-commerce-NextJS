import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminProducts();
  // console.log(allAdminProducts, "all products");

  return <CommonListing data={allAdminProducts && allAdminProducts.data} />;
}
