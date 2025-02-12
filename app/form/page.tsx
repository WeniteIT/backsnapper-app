import { MdAssignmentAdd } from "react-icons/md";
import BaseSection from "../_components/BaseSection";
import IconText from "../_components/IconText";

export default function Formpage() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <BaseSection
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
          height="1200px"
        ></iframe>
      </BaseSection>
    </div>
  );
}
