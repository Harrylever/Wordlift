import { InsightBoard } from "./(components)/insight-board"

export default function BoardPage() {
  return (
    <div className="relative flex">
      <div className="container p-10">
        <h2 className="font-mono text-xl font-semibold">
          Build your Market Insight
        </h2>

        <div className="grid mt-10">
          <InsightBoard />
        </div>
      </div>
    </div>
  )
}
