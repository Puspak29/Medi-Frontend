import { ReportCardForm } from "../../components/index"

export default function ReportCard() {
  return (
    <>
        <ReportCardForm handleSubmit={async () => { return Promise.resolve()}} />
    </>
  )
}
