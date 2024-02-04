import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import Image from "next/image";
import React from "react";
import denemeImage from "@/../public/dashboard/order.svg";
import { ProductOutlined } from "@ant-design/icons";

const DashboardOrdersList = () => {
  return (
    <Card>
      <Text>Order List</Text>

      <div className="flex flex-col gap-2 p-5">
        <Table>
          <TableHead className="bg-[#F1F4F9]">
            <TableRow>
              <TableHeaderCell>Product Name</TableHeaderCell>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Pieces</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="flex gap-2 items-center ">
                <Image src={denemeImage} width={50} height={20} alt="deneme" />
                Product 1
              </TableCell>
              <TableCell>Location 1</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>5</TableCell>
              <TableCell>100</TableCell>
              <TableCell>
                <Badge color="green">Delivered</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex gap-2 items-center ">
                <Image src={denemeImage} width={50} height={20} alt="deneme" />
                Product 2
              </TableCell>
              <TableCell>Location 2</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>10</TableCell>
              <TableCell>200</TableCell>
              <TableCell>
                <Badge color="orange">Pending</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex gap-2 items-center ">
                <Image src={denemeImage} width={50} height={20} alt="deneme" />
                Product 2
              </TableCell>
              <TableCell>Location 3</TableCell>
              <TableCell>01/01/2021</TableCell>
              <TableCell>15</TableCell>
              <TableCell>300</TableCell>
              <TableCell>
                <Badge color="red">Cancelled</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default DashboardOrdersList;
