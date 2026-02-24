import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

// Dummy data for preview
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "John Doe",
    type: "monthly-report",
    data: {
      month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
  },
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
      accountName: "Personal",
    },
  },
};

export default function EmailTemplate({
  userName = PREVIEW_DATA.monthlyReport.userName,
  type = "monthly-report",
  data = PREVIEW_DATA.monthlyReport.data,
}) {
  if (type === "monthly-report") {
    const net = Number(data?.stats.totalIncome) - Number(data?.stats.totalExpenses);
    const isPositiveNet = net >= 0;

    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report for {data?.month} is ready 📊</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>

            {/* Header Banner */}
            <div style={styles.header}>
              <Text style={styles.logoText}>Fintrack AI</Text>
              <Text style={styles.headerSubtitle}>Monthly Financial Report</Text>
              <Text style={styles.headerMonth}>{data?.month}</Text>
            </div>

            {/* Greeting */}
            <Section style={styles.contentPadding}>
              <Text style={styles.greeting}>Hello, {userName} 👋</Text>
              <Text style={styles.subText}>
                Here&rsquo;s a summary of your financial activity for <strong>{data?.month}</strong>. Keep up the great work managing your finances!
              </Text>
            </Section>

            {/* Stats Cards */}
            <Section style={styles.contentPadding}>
              <div style={styles.statsGrid}>
                <div style={{ ...styles.statCard, borderTop: "4px solid #22c55e" }}>
                  <Text style={styles.statLabel}>Total Income</Text>
                  <Text style={{ ...styles.statValue, color: "#22c55e" }}>
                    ${Number(data?.stats.totalIncome).toFixed(2)}
                  </Text>
                </div>
                <div style={{ ...styles.statCard, borderTop: "4px solid #ef4444" }}>
                  <Text style={styles.statLabel}>Total Expenses</Text>
                  <Text style={{ ...styles.statValue, color: "#ef4444" }}>
                    ${Number(data?.stats.totalExpenses).toFixed(2)}
                  </Text>
                </div>
                <div style={{ ...styles.statCard, borderTop: `4px solid ${isPositiveNet ? "#3b82f6" : "#f97316"}` }}>
                  <Text style={styles.statLabel}>Net Savings</Text>
                  <Text style={{ ...styles.statValue, color: isPositiveNet ? "#3b82f6" : "#f97316" }}>
                    {isPositiveNet ? "+" : ""}${net.toFixed(2)}
                  </Text>
                </div>
              </div>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.contentPadding}>
                <div style={styles.sectionCard}>
                  <Text style={styles.sectionTitle}>💰 Expenses by Category</Text>
                  <Hr style={styles.divider} />
                  {Object.entries(data.stats.byCategory)
                    .sort(([, a], [, b]) => b - a)
                    .map(([category, amount]) => {
                      const pct = ((Number(amount) / Number(data.stats.totalExpenses)) * 100).toFixed(0);
                      return (
                        <div key={category}>
                          <div style={styles.categoryRow}>
                            <Text style={styles.categoryName}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                            <Text style={styles.categoryAmount}>${Number(amount).toFixed(2)}</Text>
                          </div>
                          {/* Progress bar */}
                          <div style={styles.progressBg}>
                            <div style={{ ...styles.progressFill, width: `${pct}%`, backgroundColor: "#6366f1" }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.contentPadding}>
                <div style={styles.insightCard}>
                  <Text style={styles.sectionTitle}>✨ AI-Powered Insights</Text>
                  <Hr style={styles.divider} />
                  {data.insights.map((insight, index) => (
                    <div key={index} style={styles.insightRow}>
                      <div style={styles.insightNumberCell}>
                        <div style={styles.insightNumberBadge}>{index + 1}</div>
                      </div>
                      <Text style={styles.insightText}>{insight}</Text>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Footer */}
            <Section style={styles.contentPadding}>
              <Hr style={styles.divider} />
              <Text style={styles.footer}>
                This report was generated automatically by <strong>Fintrack AI</strong>.<br />
                Keep tracking your finances for a better financial future. 🚀
              </Text>
            </Section>

          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    const percentage = Number(data?.percentageUsed);
    const remaining = Number(data?.budgetAmount) - Number(data?.totalExpenses);
    const isNearLimit = percentage >= 90;
    const alertColor = isNearLimit ? "#ef4444" : "#f97316";

    return (
      <Html>
        <Head />
        <Preview>⚠️ You've used {percentage.toFixed(1)}% of your monthly budget</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>

            {/* Header Banner */}
            <div style={{ ...styles.header, background: isNearLimit ? "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)" : "linear-gradient(135deg, #f97316 0%, #c2410c 100%)" }}>
              <Text style={styles.logoText}>Fintrack AI</Text>
              <Text style={styles.headerSubtitle}>{isNearLimit ? "🚨 Budget Critical" : "⚠️ Budget Alert"}</Text>
              <Text style={styles.headerMonth}>{data?.accountName || "Default Account"}</Text>
            </div>

            {/* Greeting */}
            <Section style={styles.contentPadding}>
              <Text style={styles.greeting}>Heads up, {userName}!</Text>
              <Text style={styles.subText}>
                You&rsquo;ve used <strong style={{ color: alertColor }}>{percentage.toFixed(1)}%</strong> of your monthly budget.
                {isNearLimit ? " You're almost at your limit — time to slow down on spending!" : " You're getting close to your limit."}
              </Text>
            </Section>

            {/* Progress Bar */}
            <Section style={styles.contentPadding}>
              <div style={styles.sectionCard}>
                <div style={{ display: "table", width: "100%", marginBottom: "8px" }}>
                  <Text style={{ ...styles.categoryName, display: "table-cell" }}>Budget Used</Text>
                  <Text style={{ ...styles.categoryAmount, display: "table-cell", textAlign: "right", color: alertColor, fontWeight: "700", fontSize: "18px" }}>
                    {percentage.toFixed(1)}%
                  </Text>
                </div>
                <div style={styles.progressBg}>
                  <div style={{ ...styles.progressFill, width: `${Math.min(percentage, 100)}%`, backgroundColor: alertColor }} />
                </div>
              </div>
            </Section>

            {/* Stats Cards */}
            <Section style={styles.contentPadding}>
              <div style={styles.statsGrid}>
                <div style={{ ...styles.statCard, borderTop: "4px solid #6366f1" }}>
                  <Text style={styles.statLabel}>Monthly Budget</Text>
                  <Text style={{ ...styles.statValue, color: "#6366f1" }}>
                    ${Number(data?.budgetAmount).toFixed(2)}
                  </Text>
                </div>
                <div style={{ ...styles.statCard, borderTop: `4px solid ${alertColor}` }}>
                  <Text style={styles.statLabel}>Spent So Far</Text>
                  <Text style={{ ...styles.statValue, color: alertColor }}>
                    ${Number(data?.totalExpenses).toFixed(2)}
                  </Text>
                </div>
                <div style={{ ...styles.statCard, borderTop: `4px solid ${remaining >= 0 ? "#22c55e" : "#ef4444"}` }}>
                  <Text style={styles.statLabel}>Remaining</Text>
                  <Text style={{ ...styles.statValue, color: remaining >= 0 ? "#22c55e" : "#ef4444" }}>
                    ${remaining.toFixed(2)}
                  </Text>
                </div>
              </div>
            </Section>

            {/* Tips */}
            <Section style={styles.contentPadding}>
              <div style={styles.insightCard}>
                <Text style={styles.sectionTitle}>💡 Quick Tips</Text>
                <Hr style={styles.divider} />
                {[
                  "Review your recent transactions to identify areas to cut back.",
                  "Consider deferring non-essential purchases to next month.",
                  "Set up transaction alerts to stay on top of your spending.",
                ].map((tip, i) => (
                  <div key={i} style={styles.insightRow}>
                    <div style={styles.insightNumberCell}>
                      <div style={styles.insightNumberBadge}>{i + 1}</div>
                    </div>
                    <Text style={styles.insightText}>{tip}</Text>
                  </div>
                ))}
              </div>
            </Section>

            {/* Footer */}
            <Section style={styles.contentPadding}>
              <Hr style={styles.divider} />
              <Text style={styles.footer}>
                This alert was sent by <strong>Fintrack AI</strong> to help you stay on budget.<br />
                You&rsquo;ll receive alerts when you reach 80% of your monthly budget.
              </Text>
            </Section>

          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f1f5f9",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "20px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    maxWidth: "600px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  header: {
    background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    padding: "40px 32px",
    textAlign: "center",
  },
  logoText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    margin: "0 0 8px",
  },
  headerSubtitle: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 6px",
  },
  headerMonth: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "16px",
    margin: 0,
  },
  contentPadding: {
    padding: "0 32px",
  },
  greeting: {
    color: "#111827",
    fontSize: "22px",
    fontWeight: "700",
    margin: "28px 0 8px",
  },
  subText: {
    color: "#6b7280",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 8px",
  },
  statsGrid: {
    margin: "8px 0 16px",
  },
  statCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "10px",
    padding: "16px 20px",
    marginBottom: "12px",
    border: "1px solid #e5e7eb",
  },
  statLabel: {
    color: "#9ca3af",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    margin: "0 0 6px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    margin: 0,
  },
  sectionCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "10px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    marginBottom: "8px",
  },
  insightCard: {
    backgroundColor: "#faf5ff",
    borderRadius: "10px",
    padding: "20px",
    border: "1px solid #e9d5ff",
    marginBottom: "8px",
  },
  sectionTitle: {
    color: "#111827",
    fontSize: "16px",
    fontWeight: "700",
    margin: "0 0 12px",
  },
  divider: {
    borderColor: "#e5e7eb",
    margin: "0 0 16px",
  },
  categoryRow: {
    display: "table",
    width: "100%",
    marginBottom: "4px",
  },
  categoryName: {
    display: "table-cell",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "500",
    textTransform: "capitalize",
    margin: 0,
  },
  categoryAmount: {
    display: "table-cell",
    textAlign: "right",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
  },
  progressBg: {
    backgroundColor: "#e5e7eb",
    borderRadius: "99px",
    height: "6px",
    width: "100%",
    marginBottom: "14px",
    overflow: "hidden",
  },
  progressFill: {
    height: "6px",
    borderRadius: "99px",
  },
  insightRow: {
    display: "table",
    width: "100%",
    marginBottom: "12px",
  },
  insightNumberCell: {
    display: "table-cell",
    width: "32px",
    verticalAlign: "top",
    paddingTop: "1px",
  },
  insightNumberBadge: {
    width: "24px",
    height: "24px",
    backgroundColor: "#6366f1",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
    textAlign: "center",
    borderRadius: "50%",
    lineHeight: "24px",
  },
  insightText: {
    display: "table-cell",
    paddingLeft: "12px",
    color: "#4b5563",
    fontSize: "14px",
    lineHeight: "1.6",
    verticalAlign: "top",
    margin: 0,
  },
  footer: {
    color: "#9ca3af",
    fontSize: "13px",
    textAlign: "center",
    lineHeight: "1.6",
    margin: "16px 0 28px",
  },
};
