import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@tremor/react";

type DashboardCartProps = {
  item: {
    id: number;
    title: string;
    kpi: string;
  };
  id: number;
};

export function DashboardCart({ item, id }: DashboardCartProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      className="m-3 h-[158px]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {id}
    </Card>
  );
}
