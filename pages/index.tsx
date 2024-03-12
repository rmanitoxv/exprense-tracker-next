import Daily from "@/components/Daily"
import NewExpense from "@/components/NewExpense"
import { useCallback, useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { getExpense } from "./utils/apiHandler"
import { useAppDispatch, useAppSelector } from "./utils/hooks"
import { setExpenses } from "./utils/reducers/expensesReducer"
import { setTotal } from "./utils/reducers/totalReducer"

interface expenseObject {
  amount: number
  createdAt: string
  description: string
  id: string
  title: string
  updatededAt: string
  userId: string
}

const Index = () => {
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false)
  const expenses = useAppSelector((state) => state.expenses.expenses)
  const total = useAppSelector((state) => state.total.total)
  const dispatch = useAppDispatch()

  const fetchExpense = useCallback(async () => {
    const result = await getExpense()
    dispatch(setExpenses(result.data))
    dispatch(setTotal(result.data))
  }, [])

  useEffect(() => {
    fetchExpense()
  }, [fetchExpense])

  return (
    <main className="flex flex-col items-center py-20 px-48">
      <div
        className={`fixed left-0 backdrop-brightness-75 backdrop-blur-sm h-screen w-screen transition-all top-0 ${
          isNewExpenseOpen ? "z-20" : "-z-10 opacity-0"
        }`}
      >
        <NewExpense
          isNewExpenseOpen={isNewExpenseOpen}
          setIsNewExpenseOpen={setIsNewExpenseOpen}
          fetchExpense={fetchExpense}
        />
      </div>
      <div className="border-white border-2 py-8 px-16 rounded-xl text-7xl bg-slate-900">
        <p className="text-lg">Total Monthly Expense:</p>P{total.toFixed(2)}
      </div>
      <div className="w-full flex justify-end mt-10 px-20">
        <button
          className="transition-all border-2 flex gap-2 select-none items-center border-white rounded-lg px-4 py-2 bg-slate-900 hover:text-slate-900 hover:bg-white"
          onClick={() => setIsNewExpenseOpen(true)}
        >
          <FaPlus />
          Add New Expense
        </button>
      </div>
      <div className="mt-20 flex flex-col items-start w-full gap-10 ">
        {Object.entries(expenses).map(([date, objects]) => (
          <Daily date={date} objects={objects} key={date} />
        ))}
      </div>
    </main>
  )
}

export default Index
Index.auth = true
