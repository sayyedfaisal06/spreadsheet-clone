import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const breadcrumbItems = [
  {
    id: 1,
    title: "Workspace",
    active: false,
  },
  {
    id: 2,
    title: "Folder 2",
    active: false,
  },
  {
    id: 3,
    title: "Spreadsheet 3",
    active: true,
  },
];

const BreadCrumbs = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map(({ id, title, active }, index) => (
          <React.Fragment key={id}>
            <BreadcrumbItem className="text-sm font-medium leading-5 text-gray-400">
              {active ? (
                <BreadcrumbPage className="text-sm font-medium leading-5">
                  {title}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="#">{title}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {/* Add separator only if it's NOT the last item */}
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
        <BreadcrumbEllipsis className="text-gray-400" />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
