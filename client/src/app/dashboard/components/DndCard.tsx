"use client";
import React, { useState } from "react";
import { Grid } from "@tremor/react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DashboardCart } from "./DashboardCard";
import { gridDataType } from "@/types/dataTypes";

const gridData = [
  {
    id: 1,
    title: "Title",
    kpi: "KPI 1",
  },
  {
    id: 2,
    title: "Title",
    kpi: "KPI 2",
  },
  {
    id: 3,
    title: "Title",
    kpi: "KPI 3",
  },
  {
    id: 4,
    title: "Title",
    kpi: "KPI 4",
  },
] as gridDataType[];

const DndCard = () => {
  const [gridDataState, setGridDataState] = useState(gridData);
  const [languages, setLanguages] = useState(
    gridDataState.map((item) => item.id)
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = languages.indexOf(active.id);
      const newIndex = languages.indexOf(over.id);
      const newLanguages = arrayMove(languages, oldIndex, newIndex);
      setLanguages(newLanguages);
      const mappedGridData = newLanguages.map((id) => {
        return gridDataState.find((item) => item.id === id);
      });
      setGridDataState(mappedGridData as gridDataType[]);
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={languages}
        strategy={horizontalListSortingStrategy}
      >
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-2">
          {gridDataState.map((item) => (
            <DashboardCart key={item.id} item={item} id={item.id} />
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

export default DndCard;
