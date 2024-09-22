import { GiftToPay } from "src/types";
import { formatCurrencyValue } from "src/utils/formatCurrency";
import styled from "styled-components";

export const Table = styled.table`
  margin-top: 24px;

  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tbody > tr:hover {
    background-color: ${props => props.theme.off_white};
    overflow-y: scroll;
  }
`;

export const HeaderTable = styled.thead`
  background-color: ${props => props.theme.table_green};
  color: ${props => props.theme.white};
  
  .description {
    width: 100%;
  }
`;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 2px solid ${props => props.theme.off_white};
  }

  :last-child{
    float: right;
  }
`;

export const ItemsPaid: React.FC = () => {
  const itemPaid = JSON.parse(sessionStorage.getItem("itemToPay")!) as GiftToPay;

  return (
    <Table>
      <HeaderTable>
        <tr>
          <th>ID</th>
          <th className="description">Item</th>
          <th>Valor</th>
        </tr>
      </HeaderTable>
      <tbody>
        <TableRow>
          <td>1</td>
          <td>{itemPaid.name}</td>
          <td>{formatCurrencyValue(parseFloat(itemPaid.giftValue))}</td>
        </TableRow>
        <TableRow>
          <td>TOTAL:</td>
          <td></td>
          <td>{formatCurrencyValue(parseFloat(itemPaid.giftValue))}</td>
        </TableRow>
      </tbody>
    </Table>
  );
};
