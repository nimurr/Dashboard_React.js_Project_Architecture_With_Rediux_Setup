import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import Piechart from "../../component/Main/Dashboard/Piechart";
import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import Status from "../../component/Main/Dashboard/Status";
const DashboardHome = () => {
  return (
    <section>
      <h1 className="text-4xl font-semibold py-5 px-3">Overview</h1>
      <div className="px-3">
        <Status />
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 pt-10">
          <IncomeGraphChart />
          <Piechart />
        </div>
        <RecentTransactions />
      </div>
    </section>
  );
};

export default DashboardHome;
