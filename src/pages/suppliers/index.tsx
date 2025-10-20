import { Content } from "src/styles/style";
import { SupplierDetailsComponent } from "./components/add-supplier";
import { CardComponent } from "src/components/Cards";
import { WrapperItems } from "../gifts/styles";
import { useRef, useState } from "react";
import { useSuppliers } from "./hooks/useSuppliers";
import { ISupplierType } from "./types";

export const SuppliersPage = () => {

  const { data: lista, isFetching, addSupplier } = useSuppliers();

  const [showDetails, setShowDetailsState] = useState<boolean>(!isFetching);
  const supplierRef = useRef<ISupplierType | null>(null);
  return (
    <Content>
      {!showDetails ? (
        <WrapperItems>
          {lista?.map((item, index) => {
            return (
              <CardComponent
                content={{
                  id: index.toString(),
                  image: item.logo ?? '',
                  name: item.name
                }}
                buttonText="Visualizar"
                buttonAction={() => {
                  supplierRef.current = item;
                  setShowDetailsState(!showDetails);
                }}
              />
            )
          })}
        </WrapperItems>
      ) : (
        <SupplierDetailsComponent
          supplier={supplierRef.current!}
          addItem={addSupplier.mutate}
        />
      )}
    </Content>
  );
}