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

  tr:hover {
    background-color: ${props => props.theme.off_white};
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

const itens = [
  {
    name: "Spotify",
    value: 280.05
  },
  {
    name: "Janar do casal",
    value: 560.00
  },
  {
    name: "Viagem para Gramado",
    value: 9518.60
  },
  {
    name: "6 meses de academia",
    value: 1300.00
  },
];

export const ItemsPaid: React.FC = () => {
  const totalValue = itens.reduce((acc, gift) => { return acc + gift.value }, 0).toLocaleString(
    { language: 'pt-BR' },
    { style: 'currency', currency: 'BRL' }
  );
  
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
        {itens.map((pagamento, index) => (
          <TableRow key={index + 1}>
            <td>{index + 1}</td>
            <td>{pagamento.name}</td>
            <td>{pagamento.value.toLocaleString(
              { language: 'pt-BR' },
              { style: 'currency', currency: 'BRL' }
            )}</td>
          </TableRow>
        ))}
        <TableRow>
          <td>TOTAL:</td>
          <td></td>
          <td>{totalValue}</td>
        </TableRow>
      </tbody>
    </Table>
  );
};
