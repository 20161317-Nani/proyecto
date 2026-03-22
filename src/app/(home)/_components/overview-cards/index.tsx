import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const data = await getOverviewData();


  const safe = (obj: any) => ({
    value: obj?.value ?? 0,
    ...obj,
  });

  const productosActivos = safe(data?.productosActivos);
  const agotados = safe(data?.agotados);
  const ventasMes = safe(data?.ventasMes);
  const pedidosPendientes = safe(data?.pedidosPendientes);
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label={productosActivos.label}
        data={{
          ...productosActivos,
          value: compactFormat(productosActivos.value),
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label={agotados.label}
        data={{
          ...agotados,
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label={ventasMes.label}
        data={{
          ...ventasMes,
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label={pedidosPendientes.label}
        data={{
          ...pedidosPendientes,
        }}
        Icon={icons.Users}
      />
    </div>
  );
}