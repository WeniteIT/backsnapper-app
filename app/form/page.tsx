import { MdAssignmentAdd } from "react-icons/md";
import BaseSection from "../_components/common/BaseSection";
import IconText from "../_components/common/IconText";

export default function Formpage() {
  return (
    <div className="flex gap-4 flex-1 grow">
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
          height="100%"
          style={{ height: "calc(100vh-5rem)" }}
        ></iframe>
      </BaseSection>
    </div>
  );
}
