import useIncomeStatement from '../../hooks/useIncomeStatement';
import MonthlyStatement from '../../components/MonthlyStatement/MonthlyStatement';

const IncomeStatement = () => {
  const { createIncomeStatement } = useIncomeStatement();
  let data = createIncomeStatement();
  let items = data.map((fields) => {
    return <MonthlyStatement key={fields.month} {...fields} />;
  });
  return (
    <>
      <h1>Income Statement</h1>
      {items}
    </>
  );
};

export default IncomeStatement;
