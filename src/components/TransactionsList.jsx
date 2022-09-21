import { useCallback } from "react";
import { AutoSizer, Column, InfiniteLoader, Table } from "react-virtualized";
import "react-virtualized/styles.css";

/**
 * react-virtualized has a compatibility issue with React 18.
 * for lack of time, moved the extension to .jsx to avoid typechecking of React virtualized components
 */

const TransactionsList = ({
  walletTransactions,
  loading,
  fetchTransactions,
  onTableScroll,
}) => {
  const isRowLoaded = useCallback(
    ({ index }) => {
      return !!walletTransactions[index];
    },
    [walletTransactions]
  );

  const loadMore = loading ? () => {} : fetchTransactions;

  if (!walletTransactions.length) {
    return <></>;
  }

  return (
    <div className="container h-auto">
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMore}
        rowCount={1000000}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width }) => (
              <Table
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowClassName="table-row"
                headerHeight={40}
                width={width}
                height={700}
                rowHeight={40}
                rowCount={walletTransactions.length}
                rowGetter={({ index }) => walletTransactions[index]}
                onScroll={onTableScroll}
              >
                <Column label="Txn Hash" dataKey="hash" width={width * 0.125} />
                <Column
                  label="Method"
                  dataKey="methodId"
                  width={width * 0.125}
                />
                <Column
                  label="Block"
                  dataKey="blockHash"
                  width={width * 0.125}
                />
                <Column
                  label="Transaction date"
                  dataKey="timeStamp"
                  width={width * 0.125}
                  cellRenderer={renderTimestamp}
                />
                <Column label="From" dataKey="from" width={width * 0.125} />
                <Column label="To" dataKey="to" width={width * 0.125} />
                <Column label="Value" dataKey="value" width={width * 0.125} />
                <Column
                  label="Gas Price"
                  dataKey="gasPrice"
                  width={width * 0.125}
                />
              </Table>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default TransactionsList;

const renderTimestamp = ({ cellData }) => {
  return <div>{new Date(cellData * 1000).toDateString()}</div>;
};
