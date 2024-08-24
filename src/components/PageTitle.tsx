import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

interface BreadcrumbItemProps {
  label: string;
  href?: string;
}

interface PageTitleProps {
  title: string;
  breadcrumbs: BreadcrumbItemProps[];
}

const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-[#1b352c]  w-full">
      <div className="container flex flex-col items-center justify-center min-h-[400px]">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem key={index}>
                {item.href ? (
                  <Link to={item.href} className="text-white hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <BreadcrumbPage className="text-white">
                    {item.label}
                  </BreadcrumbPage>
                )}
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-bold text-center text-white text-5xl mt-4">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageTitle;
