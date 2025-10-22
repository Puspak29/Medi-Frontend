import { useNavigate } from "react-router-dom"
import { ReportCardForm } from "../../components/index"
import { type BasicResponse } from "../../types/basicRes"
import routes from "../../routes"
import { generateReportCard } from "../../services/doctorServices";
import { type ReportCardData } from "../../types/reportcardType";

export default function ReportCard() {
  const navigate = useNavigate();

  async function handleReportCardSubmit(reportcardData: ReportCardData): Promise<BasicResponse> {
    try {
      const responce = await generateReportCard(reportcardData);
      const email = reportcardData.userEmail;
      
      if(responce.success){
        navigate(routes.doctor.reportcard.verify, { state: { email }});
      }
      return responce;
    }
    catch(err: any){
      return {
        success: false,
        message: "Report submission failed, please try again."
      }
    }
  }
  return (
    <>
        <ReportCardForm handleSubmit={handleReportCardSubmit} />
    </>
  )
}
