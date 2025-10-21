import { useNavigate } from "react-router-dom"
import { ReportCardForm } from "../../components/index"
import { type BasicResponse } from "../../types/basicRes"
import routes from "../../routes"
import { generateReportCard } from "../../services/doctorServices";

export default function ReportCard() {
  const navigate = useNavigate();

  async function handleReportCardSubmit(params: any): Promise<BasicResponse> {
    try {
      const responce = await generateReportCard(params);
      if(responce.success){
        navigate(routes.home);
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
        <ReportCardForm handleSubmit={async () => { return Promise.resolve()}} />
    </>
  )
}
