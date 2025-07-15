import { MdAssignmentAdd } from "react-icons/md";
import BaseSection from "../_components/common/BaseSection";
import IconText from "../_components/common/IconText";
import BreadCrump from "../_components/common/BreadCrump";

export default function Formpage() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <BreadCrump label={["Home", "Record your match"]} />
      <BaseSection
        className="h-full"
        label={
          <IconText
            icon={<MdAssignmentAdd className="primary-text" />}
            text="Record your match"
          />
        }
      >
        <iframe
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=YF-XUyTrDkOvIWPezrqWEOpwPysGtUJOu6GZIYbKuWxUREVVSkE5MTM3TzhDNlpUNTlGWlVaRTJKVi4u"
          width="100%"
          height="100%"
        ></iframe>
      </BaseSection>
    </div>
  );
}
