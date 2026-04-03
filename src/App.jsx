//Content is user-generated and unverified.
import { useState, useMemo } from "react";

const INR = (n) => "₹" + Number(n).toLocaleString("en-IN");

const MOCK_TRANSACTIONS = [
  { id: 1,  date: "2026-03-01", description: "Salary",           category: "Income",       type: "income",  amount: 55000 },
  { id: 2,  date: "2026-03-02", description: "Rent",             category: "Housing",      type: "expense", amount: 12000 },
  { id: 3,  date: "2026-03-04", description: "Groceries",        category: "Food",         type: "expense", amount: 3200 },
  { id: 4,  date: "2026-03-05", description: "Hotstar",          category: "Entertainment",type: "expense", amount: 299 },
  { id: 5,  date: "2026-03-07", description: "Freelance Work",   category: "Income",       type: "income",  amount: 8000 },
  { id: 6,  date: "2026-03-09", description: "Electricity Bill", category: "Utilities",    type: "expense", amount: 950 },
  { id: 7,  date: "2026-03-11", description: "Restaurant",       category: "Food",         type: "expense", amount: 850 },
  { id: 8,  date: "2026-03-12", description: "Gym Membership",   category: "Health",       type: "expense", amount: 1200 },
  { id: 9,  date: "2026-03-14", description: "Flipkart Order",   category: "Shopping",     type: "expense", amount: 2499 },
  { id: 10, date: "2026-03-15", description: "Bonus",            category: "Income",       type: "income",  amount: 5000 },
  { id: 11, date: "2026-03-17", description: "Ola Cab",          category: "Transport",    type: "expense", amount: 320 },
  { id: 12, date: "2026-03-19", description: "Chai & Snacks",    category: "Food",         type: "expense", amount: 180 },
  { id: 13, date: "2026-03-20", description: "Phone Bill",       category: "Utilities",    type: "expense", amount: 599 },
  { id: 14, date: "2026-03-22", description: "Movie Tickets",    category: "Entertainment",type: "expense", amount: 600 },
  { id: 15, date: "2026-03-24", description: "Mutual Fund",      category: "Income",       type: "income",  amount: 2500 },
  { id: 16, date: "2026-03-25", description: "Pharmacy",         category: "Health",       type: "expense", amount: 540 },
  { id: 17, date: "2026-03-27", description: "Petrol",           category: "Transport",    type: "expense", amount: 800 },
  { id: 18, date: "2026-03-28", description: "Clothing",         category: "Shopping",     type: "expense", amount: 1800 },
  { id: 19, date: "2026-03-30", description: "Dinner Out",       category: "Food",         type: "expense", amount: 1100 },
  { id: 20, date: "2026-04-01", description: "April Salary",     category: "Income",       type: "income",  amount: 55000 },
];

const BALANCE_TREND = [
  { month: "Oct", balance: 32000 },
  { month: "Nov", balance: 41000 },
  { month: "Dec", balance: 36000 },
  { month: "Jan", balance: 52000 },
  { month: "Feb", balance: 48000 },
  { month: "Mar", balance: 65000 },
];

const CAT_COLORS = {
  Food: "#f97316", Housing: "#8b5cf6", Income: "#22c55e",
  Entertainment: "#ec4899", Utilities: "#3b82f6",
  Health: "#14b8a6", Shopping: "#f59e0b", Transport: "#6366f1",
};

const CAT_ICONS = {
  Food: "🍽️", Housing: "🏠", Income: "💰",
  Entertainment: "🎬", Utilities: "⚡",
  Health: "💊", Shopping: "🛍️", Transport: "🚗",
};

function BalanceChart({ data }) {
  const max = Math.max(...data.map((d) => d.balance));
  const min = Math.min(...data.map((d) => d.balance));
  const W = 400, H = 110, PAD = 24;
  const xStep = (W - PAD * 2) / (data.length - 1);
  const yScale = (v) => H - PAD - ((v - min) / (max - min + 1)) * (H - PAD * 2);
  const points = data.map((d, i) => `${PAD + i * xStep},${yScale(d.balance)}`).join(" ");
  const area =
    `M${PAD},${H - PAD} ` +
    data.map((d, i) => `L${PAD + i * xStep},${yScale(d.balance)}`).join(" ") +
    ` L${PAD + (data.length - 1) * xStep},${H - PAD} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 110 }}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#ag)" />
      <polyline fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={PAD + i * xStep} cy={yScale(d.balance)} r="4" fill="#6366f1" />
          <text x={PAD + i * xStep} y={H - 4} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.month}</text>
        </g>
      ))}
    </svg>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const R = 44, CX = 60, CY = 60, sw = 20;
  const circ = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 180 130" style={{ width: "100%", height: 130 }}>
      {data.map((d, i) => {
        const pct = d.value / total;
        const dash = pct * circ;
        const rot = cum * 360 - 90;
        //cum += pct;
        return (
          <circle key={i} cx={CX} cy={CY} r={R} fill="none" stroke={d.color} strokeWidth={sw}
            strokeDasharray={`${dash} ${circ - dash}`}
            style={{ transform: `rotate(${rot}deg)`, transformOrigin: `${CX}px ${CY}px` }}
          />
        );
      })}
      <text x={CX} y={CY - 5} textAnchor="middle" fontSize="10" fill="#94a3b8">Expenses</text>
      <text x={CX} y={CY + 12} textAnchor="middle" fontSize="11" fontWeight="700" fill="#f1f5f9">
        ₹{(total / 1000).toFixed(0)}K
      </text>
      {data.slice(0, 5).map((d, i) => (
        <g key={i} transform={`translate(130, ${14 + i * 22})`}>
          <rect width="9" height="9" rx="2" fill={d.color} />
          <text x="13" y="8" fontSize="9" fill="#94a3b8">{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "#0f172a", color: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif" },
  header: { background: "#1e293b", borderBottom: "1px solid #334155", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 100 },
  logo: { fontSize: 17, fontWeight: 700, color: "#a5b4fc" },
  roleArea: { display: "flex", alignItems: "center", gap: 8 },
  roleBadgeAdmin: { background: "#4f46e5", color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  roleBadgeViewer: { background: "#0f766e", color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  roleSelect: { background: "#334155", border: "none", color: "#f1f5f9", padding: "6px 10px", borderRadius: 8, fontSize: 13, cursor: "pointer" },
  nav: { display: "flex", background: "#1e293b", borderBottom: "1px solid #334155", padding: "0 16px", overflowX: "auto" },
  navBtn: { padding: "12px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", border: "none", background: "transparent", color: "#64748b", borderBottom: "2px solid transparent", whiteSpace: "nowrap" },
  navBtnActive: { padding: "12px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", border: "none", background: "transparent", color: "#a5b4fc", borderBottom: "2px solid #6366f1", whiteSpace: "nowrap" },
  content: { padding: 16, maxWidth: 1000, margin: "0 auto" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 },
  card: { background: "#1e293b", border: "1px solid #334155", borderRadius: 14, padding: 16 },
  cardLabel: { fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 },
  sectionTitle: { fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#e2e8f0" },
  filterRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14, alignItems: "center" },
  searchInput: { background: "#1e293b", border: "1px solid #334155", color: "#f1f5f9", padding: "8px 12px", borderRadius: 8, fontSize: 13, outline: "none", flex: 1, minWidth: 120 },
  filterSelect: { background: "#1e293b", border: "1px solid #334155", color: "#f1f5f9", padding: "8px 10px", borderRadius: 8, fontSize: 13, cursor: "pointer" },
  btnPrimary: { padding: "8px 16px", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer", background: "#6366f1", color: "#fff" },
  btnDanger: { padding: "5px 11px", borderRadius: 6, border: "none", fontWeight: 600, fontSize: 12, cursor: "pointer", background: "#7f1d1d", color: "#fca5a5" },
  btnSecondary: { padding: "8px 16px", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer", background: "#334155", color: "#f1f5f9" },
  tableWrap: { overflowX: "auto" },
  th: { padding: "9px 10px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 11, textTransform: "uppercase", borderBottom: "1px solid #334155" },
  td: { padding: "11px 10px", borderBottom: "1px solid #0f172a", verticalAlign: "middle" },
  badgeIncome: { padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: "#166534", color: "#86efac" },
  badgeExpense: { padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: "#7f1d1d", color: "#fca5a5" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
  modal: { background: "#1e293b", border: "1px solid #334155", borderRadius: 16, padding: 24, width: "100%", maxWidth: 400 },
  formLabel: { fontSize: 12, color: "#94a3b8", marginBottom: 4, display: "block", fontWeight: 600 },
  formInput: { width: "100%", background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9", padding: "9px 12px", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" },
  txRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #0f172a" },
  barBg: { background: "#0f172a", borderRadius: 4, height: 6, overflow: "hidden" },
  insightRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #0f172a" },
};

export default function App() {
  const [role, setRole] = useState("admin");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [newTx, setNewTx] = useState({ date: "", description: "", category: "Food", type: "expense", amount: "" });
  const [activeTab, setActiveTab] = useState("dashboard");

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const categories = [...new Set(transactions.map((t) => t.category))];

  const filtered = useMemo(() =>
    transactions
      .filter((t) => {
        const q = search.toLowerCase();
        return (
          (t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) &&
          (filterType === "all" || t.type === filterType) &&
          (filterCategory === "all" || t.category === filterCategory)
        );
      })
      .sort((a, b) => {
        if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
        if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
        if (sortBy === "amount-desc") return b.amount - a.amount;
        return a.amount - b.amount;
      }),
    [transactions, search, filterType, filterCategory, sortBy]
  );

  const highestCat = useMemo(() => {
    const map = {};
    transactions.filter((t) => t.type === "expense").forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0] || ["—", 0];
  }, [transactions]);

  const spendingByCat = useMemo(() => {
    const map = {};
    transactions.filter((t) => t.type === "expense").forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map).map(([label, value]) => ({ label, value, color: CAT_COLORS[label] || "#64748b" }));
  }, [transactions]);

  const marchIncome = transactions.filter((t) => t.type === "income" && t.date.startsWith("2026-03")).reduce((s, t) => s + t.amount, 0);
  const marchExpense = transactions.filter((t) => t.type === "expense" && t.date.startsWith("2026-03")).reduce((s, t) => s + t.amount, 0);
  const febExpense = 18500;

  const addTx = () => {
    if (!newTx.date || !newTx.description || !newTx.amount) return;
    setTransactions((p) => [...p, { ...newTx, id: Date.now(), amount: parseFloat(newTx.amount) }]);
    setNewTx({ date: "", description: "", category: "Food", type: "expense", amount: "" });
    setShowModal(false);
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>💰 FinTrack</div>
        <div style={styles.roleArea}>
          <span style={role === "admin" ? styles.roleBadgeAdmin : styles.roleBadgeViewer}>
            {role === "admin" ? "👑 Admin" : "👁 Viewer"}
          </span>
          <select style={styles.roleSelect} value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </header>

      {/* Nav */}
      <nav style={styles.nav}>
        {["dashboard", "transactions", "insights"].map((tab) => (
          <button
            key={tab}
            style={activeTab === tab ? styles.navBtnActive : styles.navBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <main style={styles.content}>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <>
            <div style={styles.grid3}>
              {[
                { label: "Balance", value: INR(balance), color: balance >= 0 ? "#a5b4fc" : "#f87171" },
                { label: "Income", value: INR(totalIncome), color: "#4ade80" },
                { label: "Expenses", value: INR(totalExpense), color: "#f87171" },
              ].map((item) => (
                <div key={item.label} style={styles.card}>
                  <div style={styles.cardLabel}>{item.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={styles.grid2}>
              <div style={styles.card}>
                <div style={styles.sectionTitle}>Balance Trend</div>
                <BalanceChart data={BALANCE_TREND} />
              </div>
              <div style={styles.card}>
                <div style={styles.sectionTitle}>Spending Breakdown</div>
                <DonutChart data={spendingByCat} />
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Recent Transactions</div>
              {transactions.slice(0, 5).map((t) => (
                <div style={styles.txRow} key={t.id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: (CAT_COLORS[t.category] || "#334155") + "22", flexShrink: 0 }}>
                      {CAT_ICONS[t.category] || "💳"}
                    </div>
                    <div style={{ marginLeft: 10 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{t.description}</div>
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{t.date} · {t.category}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.type === "income" ? "#4ade80" : "#f87171" }}>
                    {t.type === "income" ? "+" : "-"}{INR(t.amount)}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === "transactions" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>All Transactions</div>
              {role === "admin" && (
                <button style={styles.btnPrimary} onClick={() => setShowModal(true)}>+ Add</button>
              )}
            </div>
            <div style={styles.filterRow}>
              <input style={styles.searchInput} placeholder="🔍 Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <select style={styles.filterSelect} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <select style={styles.filterSelect} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select style={styles.filterSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest ₹</option>
                <option value="amount-asc">Lowest ₹</option>
              </select>
            </div>
            <div style={styles.card}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "36px 0", color: "#475569", fontSize: 14 }}>No transactions found.</div>
              ) : (
                <div style={styles.tableWrap}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 480 }}>
                    <thead>
                      <tr>
                        {["Date", "Description", "Category", "Type", "Amount", ...(role === "admin" ? ["Action"] : [])].map((h) => (
                          <th key={h} style={styles.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((t) => (
                        <tr key={t.id}>
                          <td style={{ ...styles.td, color: "#94a3b8" }}>{t.date}</td>
                          <td style={styles.td}>{t.description}</td>
                          <td style={styles.td}>
                            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", marginRight: 5, background: CAT_COLORS[t.category] || "#64748b" }} />
                            {t.category}
                          </td>
                          <td style={styles.td}>
                            <span style={t.type === "income" ? styles.badgeIncome : styles.badgeExpense}>{t.type}</span>
                          </td>
                          <td style={{ ...styles.td, fontWeight: 700, color: t.type === "income" ? "#4ade80" : "#f87171" }}>
                            {t.type === "income" ? "+" : "-"}{INR(t.amount)}
                          </td>
                          {role === "admin" && (
                            <td style={styles.td}>
                              <button style={styles.btnDanger} onClick={() => setTransactions((p) => p.filter((x) => x.id !== t.id))}>Delete</button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* INSIGHTS TAB */}
        {activeTab === "insights" && (
          <>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Spending Insights</div>
            <div style={styles.grid3}>
              <div style={styles.card}>
                <div style={styles.cardLabel}>Top Spend Category</div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 20 }}>{CAT_ICONS[highestCat[0]] || "📊"}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{highestCat[0]}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#f87171" }}>{INR(highestCat[1])}</div>
                </div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardLabel}>Mar vs Feb Expenses</div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 13, color: "#94a3b8" }}>March: <span style={{ fontWeight: 700, color: "#f87171" }}>{INR(marchExpense)}</span></div>
                  <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>February: <span style={{ fontWeight: 700 }}>{INR(febExpense)}</span></div>
                  <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: marchExpense > febExpense ? "#f87171" : "#4ade80" }}>
                    {marchExpense > febExpense ? `▲ +${INR(marchExpense - febExpense)}` : `▼ -${INR(febExpense - marchExpense)}`} vs last month
                  </div>
                </div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardLabel}>Savings Rate (Mar)</div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#a5b4fc" }}>
                    {marchIncome > 0 ? Math.round(((marchIncome - marchExpense) / marchIncome) * 100) : 0}%
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>of income saved</div>
                </div>
              </div>
            </div>

            <div style={{ ...styles.card, marginBottom: 16 }}>
              <div style={styles.sectionTitle}>Category-wise Spending</div>
              {spendingByCat.sort((a, b) => b.value - a.value).map((c) => {
                const pct = Math.round((c.value / totalExpense) * 100);
                return (
                  <div key={c.label} style={{ marginBottom: 13 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span>
                        <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", marginRight: 5, background: c.color }} />
                        {c.label}
                      </span>
                      <span style={{ fontWeight: 600 }}>{INR(c.value)} <span style={{ color: "#64748b", fontWeight: 400 }}>({pct}%)</span></span>
                    </div>
                    <div style={styles.barBg}>
                      <div style={{ width: `${pct}%`, background: c.color, height: "100%", borderRadius: 4, transition: "width 0.4s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.card}>
              <div style={styles.sectionTitle}>Key Observations</div>
              {[
                ["Transactions this month", transactions.filter((t) => t.date.startsWith("2026-03")).length],
                ["Avg expense per transaction", INR(Math.round(totalExpense / (transactions.filter((t) => t.type === "expense").length || 1)))],
                ["Income sources", transactions.filter((t) => t.type === "income").length],
                ["Net cash flow", INR(balance)],
              ].map(([label, val], i, arr) => (
                <div key={label} style={{ ...styles.insightRow, ...(i === arr.length - 1 ? { borderBottom: "none" } : {}) }}>
                  <span style={{ fontSize: 13, color: "#94a3b8" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: label === "Net cash flow" ? (balance >= 0 ? "#4ade80" : "#f87171") : "#f1f5f9" }}>{val}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Add Transaction Modal */}
      {showModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Add Transaction</div>
            {[
              { label: "Date", key: "date", type: "date" },
              { label: "Description", key: "description", type: "text", placeholder: "e.g. Grocery run" },
              { label: "Amount (₹)", key: "amount", type: "number", placeholder: "0" },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: 13 }}>
                <label style={styles.formLabel}>{f.label}</label>
                <input
                  type={f.type}
                  style={styles.formInput}
                  placeholder={f.placeholder || ""}
                  value={newTx[f.key]}
                  onChange={(e) => setNewTx((p) => ({ ...p, [f.key]: e.target.value }))}
                />
              </div>
            ))}
            <div style={{ marginBottom: 13 }}>
              <label style={styles.formLabel}>Category</label>
              <select style={styles.formInput} value={newTx.category} onChange={(e) => setNewTx((p) => ({ ...p, category: e.target.value }))}>
                {Object.keys(CAT_COLORS).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 13 }}>
              <label style={styles.formLabel}>Type</label>
              <select style={styles.formInput} value={newTx.type} onChange={(e) => setNewTx((p) => ({ ...p, type: e.target.value }))}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button style={styles.btnSecondary} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={styles.btnPrimary} onClick={addTx}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
