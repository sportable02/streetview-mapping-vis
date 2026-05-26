const Status = (Props) => {
  const { val } = Props;
  return (
    <div
      className="status-field"
      style={{ color: `var(--status-${Math.floor(val / 100)})` }}
    >
      {val}
    </div>
  );
};
export default Status;
