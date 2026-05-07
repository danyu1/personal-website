'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BarChart3, Zap, Settings, Code, Shuffle, TrendingUp, Briefcase, Rocket, ArrowRight, CircleDot, CheckCircle2, Target, Lightbulb } from 'lucide-react'
import MermaidDiagram from './MermaidDiagram'

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'features', label: 'Features', icon: <Zap className="w-4 h-4" /> },
  { id: 'tech', label: 'Tech Stack', icon: <Settings className="w-4 h-4" /> },
  { id: 'code', label: 'Code Samples', icon: <Code className="w-4 h-4" /> },
]

export default function PriorSystemsShowcase() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <section className="mx-auto max-w-[1700px] px-8 lg:px-14 py-10">
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-white/30" />
          <span className="text-base font-mono text-zinc-400 uppercase tracking-wider">
            Project Showcase
          </span>
        </div>
        <h1 className="mb-3 text-4xl lg:text-5xl font-medium tracking-tight text-white">
          Prior Systems
        </h1>
        <p className="max-w-2xl text-lg text-zinc-300 leading-relaxed">
          Full-stack quantitative trading platform with real-time portfolio
          tracking, Black–Scholes options pricing, and 15+ technical indicators.
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <a
            href="https://priorsystems.net"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-black font-mono text-base hover:bg-zinc-200 transition-colors"
          >
            Visit Live Site
          </a>
          <a
            href="https://github.com/danyu1/relay-trader"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/15 text-zinc-300 font-mono text-base hover:border-white/40 hover:text-white transition-colors"
          >
            View Code
          </a>
        </div>
      </div>

      {/* Main Showcase Image */}
      <div className="mb-10 overflow-hidden border border-white/10">
        <Image
          src="/images/prior-systems/dashboard.png"
          alt="Prior Systems Demo"
          width={1200}
          height={675}
          className="w-full"
          priority
        />
      </div>

      {/* Tabbed Content */}
      <div className="mb-10">
        {/* Tab Navigation */}
        <div className="mb-6 flex flex-wrap gap-1.5 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 -mb-px font-mono text-base tracking-wider uppercase transition flex items-center gap-2 border-b ${
                activeTab === tab.id
                  ? "text-white border-white"
                  : "text-zinc-400 border-transparent hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="border border-white/10 bg-white/[0.02] p-6 lg:p-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'features' && <FeaturesTab />}
          {activeTab === 'tech' && <TechStackTab />}
          {activeTab === 'code' && <CodeSamplesTab />}
        </div>
      </div>

      {/* Architecture Diagram */}
      <ArchitectureSection />

      {/* Impact Section */}
      <ImpactSection />
    </section>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-2xl font-bold text-white">What is Prior Systems?</h3>
        <p className="text-zinc-300 leading-relaxed">
          Prior Systems is a production-grade algorithmic trading backtesting platform that enables
          traders and quantitative analysts to test trading strategies against historical market data.
          The platform features dual-mode analysis, real-time portfolio tracking, and advanced
          performance analytics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FeatureCard
          title="Dual-Mode Analysis"
          description="Switch between mechanical strategies (15+ technical indicators) and manual fundamental analysis with options trading"
          icon={<Shuffle className="w-8 h-8" />}
        />
        <FeatureCard
          title="Black-Scholes Pricing"
          description="Full implementation of options pricing model with Greeks calculation (Delta, Gamma, Theta, Vega)"
          icon={<TrendingUp className="w-8 h-8" />}
        />
        <FeatureCard
          title="Real-Time Portfolio"
          description="Track multi-asset portfolios with live P&L updates, position-level analytics, and automatic price refresh"
          icon={<Briefcase className="w-8 h-8" />}
        />
        <FeatureCard
          title="Production Deployed"
          description="Live at priorsystems.net with 10+ active users from UChicago quantitative finance organizations"
          icon={<Rocket className="w-8 h-8" />}
        />
      </div>

      <div className="rounded-lg bg-white/[0.03] border border-white/15 p-6">
        <h4 className="mb-2 font-semibold text-zinc-400">Technical Highlights</h4>
        <ul className="space-y-2 text-lg text-zinc-300">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" /> Microservices architecture on Vercel + Railway</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" /> Processes 10K+ bars of data with sub-100ms rendering</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" /> PostgreSQL with SQLAlchemy handling 50K+ data points</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" /> 12 RESTful API endpoints with &lt;200ms latency</li>
        </ul>
      </div>
    </div>
  )
}

function FeaturesTab() {
  return (
    <div className="space-y-8">
      <FeatureShowcase
        title="Mechanical Trading Mode"
        description="Backtest algorithmic strategies using technical indicators"
        features={[
          '15+ technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands)',
          'Custom strategy builder with position sizing',
          'Risk-adjusted metrics (Sharpe ratio, max drawdown)',
          'CSV data import for any stock/ETF',
        ]}
        imagePath="/images/prior-systems/mechanical-mode.png"
      />

      <FeatureShowcase
        title="Fundamental Trading Mode"
        description="Manually place trades with options pricing"
        features={[
          'Click-to-trade interface on interactive charts',
          'Black-Scholes options pricing for calls and puts',
          'Stop-loss and take-profit configuration',
          'Risk/reward ratio calculator',
        ]}
        imagePath="/images/prior-systems/fundamental-mode.png"
        reverse
      />

      <FeatureShowcase
        title="Portfolio Analytics"
        description="Real-time tracking of portfolio performance"
        features={[
          'Live P&L calculation across all positions',
          'Daily gain/loss tracking',
          'Position-level performance metrics',
          'Custom chart styling with persistence',
        ]}
        imagePath="/images/prior-systems/portfolio-tracking.png"
      />
    </div>
  )
}

function TechStackTab() {
  const techCategories = [
    {
      title: 'Frontend',
      color: 'blue',
      technologies: [
        { name: 'Next.js 16', description: 'App Router with React 18' },
        { name: 'TypeScript', description: 'Strict type safety, 8K+ lines' },
        { name: 'Chart.js', description: 'Data visualization' },
        { name: 'Tailwind CSS', description: 'Responsive UI styling' },
      ],
    },
    {
      title: 'Backend',
      color: 'green',
      technologies: [
        { name: 'FastAPI', description: 'Python async API framework' },
        { name: 'PostgreSQL', description: 'Relational database' },
        { name: 'SQLAlchemy', description: 'ORM for database operations' },
        { name: 'scipy/numpy', description: 'Statistical calculations' },
      ],
    },
    {
      title: 'DevOps',
      color: 'purple',
      technologies: [
        { name: 'Vercel', description: 'Frontend deployment' },
        { name: 'Railway', description: 'Backend deployment' },
        { name: 'Git/GitHub', description: 'Version control' },
        { name: 'yfinance API', description: 'Market data integration' },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {techCategories.map((category) => (
        <div key={category.title}>
          <h3 className="mb-4 text-xl font-bold text-white">{category.title}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {category.technologies.map((tech) => (
              <div
                key={tech.name}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4 hover:border-white/30 transition"
              >
                <div className="mb-1 font-semibold text-white">{tech.name}</div>
                <div className="text-lg text-zinc-400">{tech.description}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CodeSamplesTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-xl font-bold text-white">
          Black-Scholes Options Pricing Implementation
        </h3>
        <p className="mb-4 text-lg text-zinc-400">
          Full implementation of the Black-Scholes model for option pricing with Greeks calculation
        </p>
        <pre className="overflow-x-auto rounded-lg bg-black/50 border border-white/10 p-4 text-lg text-zinc-100">
          <code>{`def black_scholes_price(
    option_type: Literal["call", "put"],
    spot_price: float,
    strike: float,
    time_to_expiry: float,
    volatility: float,
    risk_free_rate: float = 0.05,
) -> float:
    """Calculate option price using Black-Scholes model."""

    # Calculate d1 and d2
    d1 = (math.log(spot_price / strike) +
          (risk_free_rate + 0.5 * volatility**2) * time_to_expiry) / \\
         (volatility * math.sqrt(time_to_expiry))
    d2 = d1 - volatility * math.sqrt(time_to_expiry)

    if option_type == "call":
        price = (spot_price * stats.norm.cdf(d1) -
                 strike * math.exp(-risk_free_rate * time_to_expiry) *
                 stats.norm.cdf(d2))
    else:  # put
        price = (strike * math.exp(-risk_free_rate * time_to_expiry) *
                 stats.norm.cdf(-d2) - spot_price * stats.norm.cdf(-d1))

    return max(0, price)`}</code>
        </pre>
      </div>

      <div>
        <h3 className="mb-3 text-xl font-bold text-white">
          TypeScript Type Safety Example
        </h3>
        <p className="mb-4 text-lg text-zinc-400">
          Handling union types for form inputs while maintaining arithmetic type safety
        </p>
        <pre className="overflow-x-auto rounded-lg bg-black/50 border border-white/10 p-4 text-lg text-zinc-100">
          <code>{`// Allow empty string for better UX (user can clear field)
const [quantity, setQuantity] = useState<number | ''>(100);

// Type-safe arithmetic operations
const positionCost = (typeof quantity === 'number' ? quantity : 1) * price;

// Input handling with validation
onChange={(e) => {
  const val = e.target.value;
  if (val === '') {
    setQuantity('');
  } else {
    const num = parseInt(val);
    if (!isNaN(num)) setQuantity(num);
  }
}}
onBlur={() => {
  if (quantity === '') setQuantity(1);
}}`}</code>
        </pre>
      </div>
    </div>
  )
}

function ArchitectureSection() {
  const mermaidChart = `graph TB
    subgraph "Client Layer"
        Browser[" Web Browser<br/>Chrome, Firefox, Safari"]
        LocalStorage[" Local Storage<br/>• Portfolio Configs<br/>• Chart Styles<br/>• User Preferences"]
    end

    subgraph "Vercel Edge Network - Frontend CDN"
        NextJS[" Next.js 16 App Router<br/>TypeScript | React 18<br/>Server-Side Rendering"]
        EdgeFunc[" Edge Functions<br/>API Routes<br/>Middleware"]
    end

    subgraph "Frontend Application - 8,000+ Lines TypeScript"

        subgraph "Core Pages"
            LivePrices[" Live Prices<br/>• Real-time Portfolio Tracking<br/>• Multi-asset Support<br/>• Auto-refresh (5min)<br/>• P&L Calculation"]
            Backtest[" Backtest Console<br/>• Dual-mode Trading<br/>• Strategy Builder<br/>• Results Visualization"]
            DataSelection[" Data Selection<br/>• CSV Upload (50K+ rows)<br/>• Date Range Picker<br/>• Dataset Manager"]
            Dashboard[" Dashboard<br/>• User Overview<br/>• Quick Actions<br/>• Navigation Hub"]
        end

        subgraph "Mechanical Trading Mode"
            StrategyBuilder[" Strategy Builder<br/>• Custom Parameters<br/>• Position Sizing<br/>• Commission/Slippage"]
            TechIndicators[" Technical Indicators (15+)<br/>• SMA, EMA (Multiple periods)<br/>• RSI, MACD, Stochastic<br/>• Bollinger Bands<br/>• Volume Analysis"]
            BuiltinStrategies[" Built-in Strategies<br/>• Buy & Hold<br/>• MA Crossover<br/>• RSI Mean Reversion"]
        end

        subgraph "Fundamental Trading Mode"
            ManualMode[" Manual Trading UI<br/>• Click-to-Trade<br/>• Interactive Charts<br/>• Real-time Feedback"]
            OptionsUI[" Options Interface<br/>• Calls/Puts Selection<br/>• Strike Price Input<br/>• Expiry Date Picker"]
            ExitStrategy[" Exit Strategy Modal<br/>• Stop Loss Config<br/>• Take Profit Config<br/>• Risk/Reward Display"]
            RiskCalculator[" Risk Calculator<br/>• Position Size<br/>• R/R Ratio<br/>• Max Loss Display"]
        end

        subgraph "Shared UI Components"
            ChartViz[" Chart.js Visualization<br/>• Interactive Charts (10K+ bars)<br/>• Zoom/Pan Controls<br/>• Trade Annotations<br/>• Custom Styling<br/>• <100ms Render Time"]
            StateManagement[" React State Management<br/>• useState (Complex State)<br/>• useCallback (Memoization)<br/>• useMemo (Performance)<br/>• useEffect (Side Effects)<br/>• 12+ Components"]
            TypeSafety[" TypeScript Type System<br/>• Strict Mode Enabled<br/>• Union Types (number | '')<br/>• Type Guards<br/>• Interface Definitions<br/>• Zero 'any' Types"]
        end
    end

    subgraph "Railway Cloud - Backend API"
        FastAPI[" FastAPI Backend<br/>Python 3.11+ | Async/Await<br/><200ms Avg Latency"]

        subgraph "REST API Endpoints (12 Total)"
            AuthAPI[" /auth<br/>• POST /signup<br/>• POST /login<br/>• POST /logout<br/>• Cookie-based Auth"]
            BacktestAPI[" /backtest<br/>• POST /backtest<br/>• GET /strategies<br/>• Strategy Execution"]
            PortfolioAPI[" /portfolio<br/>• GET /portfolios<br/>• POST /save<br/>• PUT /update<br/>• DELETE /delete"]
            DataAPI[" /data<br/>• POST /upload-csv<br/>• GET /datasets<br/>• GET /preview<br/>• 50K+ rows support"]
            UserAPI[" /user<br/>• GET /settings<br/>• PUT /settings<br/>• GET /profiles<br/>• Profile Management"]
            PricesAPI[" /prices<br/>• POST /refresh<br/>• GET /current<br/>• Live Data Fetch"]
        end

        subgraph "Middleware Pipeline"
            CORS["CORS Handler<br/>• Origin Validation<br/>• Credentials Support<br/>• Regex Patterns<br/>• priorsystems.net"]
            AuthMiddleware[" Auth Middleware<br/>• Cookie Validation<br/>• Session Management<br/>• HTTP-Only Cookies"]
            ErrorHandler[" Error Handler<br/>• Exception Logging<br/>• Structured Responses<br/>• Status Codes"]
        end
    end

    subgraph "Business Logic Layer - Core Engine"

        subgraph "Backtesting Engine"
            MechSimulator["⚙️ Mechanical Simulator<br/>• Strategy Execution<br/>• Position Sizing<br/>• Commission Calc<br/>• Slippage Modeling<br/>• Trade History"]
            ManualSimulator[" Manual Simulator<br/>• Trade Annotations<br/>• Options Pricing<br/>• Stock Trades<br/>• P&L Tracking<br/>• Exit Management"]
        end

        subgraph "Options Pricing Models"
            BlackScholes[" Black-Scholes Model<br/>• Call/Put Pricing<br/>• d1/d2 Calculation<br/>• Normal Distribution<br/>• Risk-free Rate (5%)<br/>• Volatility Input"]
            GreeksCalculator[" Greeks Calculator<br/>• Delta (Price Sensitivity)<br/>• Gamma (Delta Change Rate)<br/>• Theta (Time Decay)<br/>• Vega (Vol Sensitivity)<br/>• Real-time Updates"]
            TimeCalculator[" Time to Expiry<br/>• Date Parsing<br/>• Years Calculation<br/>• Expiry Validation"]
        end

        subgraph "Technical Analysis Engine"
            IndicatorLibrary[" Indicator Library<br/>• SMA (5,10,20,50,200)<br/>• EMA (12,26)<br/>• RSI (14 period)<br/>• MACD (12,26,9)<br/>• Bollinger (20,2σ)<br/>• Stochastic (14,3,3)"]
            SignalGenerator[" Signal Generator<br/>• Buy/Sell Signals<br/>• Entry/Exit Logic<br/>• Crossover Detection<br/>• Threshold Monitoring"]
        end

        subgraph "Portfolio Analytics"
            PLCalculator["💵 P&L Calculator<br/>• Position-level Tracking<br/>• Daily Gains/Losses<br/>• Total Returns<br/>• Realized/Unrealized<br/>• FIFO Accounting"]
            MetricsEngine[" Performance Metrics<br/>• Sharpe Ratio<br/>• Max Drawdown<br/>• Win Rate %<br/>• Avg Trade P&L<br/>• Total Trades"]
            PositionManager[" Position Manager<br/>• FIFO Tracking<br/>• Average Cost Basis<br/>• Unrealized P&L<br/>• Multi-asset Support"]
        end
    end

    subgraph "Data Access Layer"
        ORM[" SQLAlchemy ORM<br/>• Async Operations<br/>• Session Management<br/>• Query Optimization<br/>• Relationship Mapping"]
        Models[" Database Models<br/>• User (Auth)<br/>• Portfolio (Holdings)<br/>• Dataset (CSV Data)<br/>• Profile (Configs)<br/>• LineStyle (Charts)"]
    end

    subgraph "PostgreSQL Database - Railway"
        UserTable[(" User Table<br/>─────────<br/>id (PK)<br/>email (UNIQUE)<br/>hashed_password<br/>created_at<br/>updated_at")]
        PortfolioTable[(" Portfolio Table<br/>─────────<br/>id (PK)<br/>user_id (FK)<br/>name<br/>positions (JSON)<br/>lineStyles (JSON)<br/>notes (TEXT)<br/>last_refresh")]
        DatasetTable[(" Dataset Table<br/>─────────<br/>id (PK)<br/>user_id (FK)<br/>name<br/>file_path<br/>symbol<br/>start_date<br/>end_date<br/>row_count")]
        ProfileTable[(" Profile Table<br/>─────────<br/>id (PK)<br/>dataset_id (FK)<br/>start_bar<br/>max_bars<br/>created_at")]
        LineStyleTable[(" LineStyle Table<br/>─────────<br/>id (PK)<br/>portfolio_id (FK)<br/>symbol<br/>color (HEX)<br/>line_width")]
        SettingsTable[(" Settings Table<br/>─────────<br/>user_id (FK)<br/>active_profile_id<br/>preferences (JSON)")]

        UserTable -.->|"1:N"| PortfolioTable
        UserTable -.->|"1:N"| DatasetTable
        PortfolioTable -.->|"1:N"| LineStyleTable
        DatasetTable -.->|"1:N"| ProfileTable
        UserTable -.->|"1:1"| SettingsTable
    end

    subgraph "External Services & APIs"
        YFinance[" yfinance API<br/>• Live Price Data<br/>• Historical OHLCV<br/>• 5-minute Refresh<br/>• Multiple Symbols<br/>• Free Tier"]
        SciPy[" SciPy/NumPy<br/>• Statistical Calculations<br/>• Normal Distribution (CDF)<br/>• Math Operations<br/>• Array Processing"]
    end

    subgraph "Data Storage Systems"
        FileSystem[" File System<br/>Railway Volume<br/>• CSV Uploads<br/>• 50K+ Data Points<br/>• Historical Prices<br/>• User Datasets"]
        MemoryCache[" In-Memory Cache<br/>• Price Data<br/>• Session State<br/>• Active Portfolios<br/>• Fast Access"]
    end

    %% Client to Frontend Connections
    Browser -->|"HTTPS (TLS 1.3)"| NextJS
    Browser <-->|"Read/Write JSON"| LocalStorage
    NextJS -->|"Hydration"| EdgeFunc

    %% Frontend Component Connections
    NextJS --> LivePrices
    NextJS --> Backtest
    NextJS --> DataSelection
    NextJS --> Dashboard

    Backtest --> StrategyBuilder
    Backtest --> ManualMode
    StrategyBuilder --> TechIndicators
    StrategyBuilder --> BuiltinStrategies
    ManualMode --> OptionsUI
    ManualMode --> ExitStrategy
    ManualMode --> RiskCalculator

    LivePrices --> ChartViz
    Backtest --> ChartViz
    DataSelection --> ChartViz
    LivePrices --> StateManagement
    Backtest --> StateManagement
    StateManagement --> TypeSafety

    %% Frontend to Backend API
    EdgeFunc -->|"REST API<br/>JSON Payload<br/>HTTPS"| CORS
    CORS --> AuthMiddleware
    AuthMiddleware --> ErrorHandler
    ErrorHandler --> FastAPI

    %% API Routing
    FastAPI --> AuthAPI
    FastAPI --> BacktestAPI
    FastAPI --> PortfolioAPI
    FastAPI --> DataAPI
    FastAPI --> UserAPI
    FastAPI --> PricesAPI

    %% Business Logic Flow
    BacktestAPI --> MechSimulator
    BacktestAPI --> ManualSimulator
    ManualSimulator --> BlackScholes
    BlackScholes --> GreeksCalculator
    ManualSimulator --> TimeCalculator
    MechSimulator --> IndicatorLibrary
    MechSimulator --> SignalGenerator
    PortfolioAPI --> PLCalculator
    PortfolioAPI --> MetricsEngine
    PortfolioAPI --> PositionManager

    %% Data Access Layer
    AuthAPI --> ORM
    BacktestAPI --> ORM
    PortfolioAPI --> ORM
    DataAPI --> ORM
    UserAPI --> ORM
    PricesAPI --> ORM
    ORM --> Models

    %% Database Connections
    Models --> UserTable
    Models --> PortfolioTable
    Models --> DatasetTable
    Models --> ProfileTable
    Models --> LineStyleTable
    Models --> SettingsTable

    %% External Service Integrations
    PricesAPI -->|"HTTP GET<br/>Real-time"| YFinance
    BlackScholes -->|"Import<br/>stats.norm.cdf"| SciPy
    GreeksCalculator -->|"Import<br/>stats.norm.pdf"| SciPy
    IndicatorLibrary -->|"Import<br/>numpy arrays"| SciPy

    %% Storage Systems
    DataAPI --> FileSystem
    BacktestAPI --> FileSystem
    PricesAPI --> MemoryCache
    PortfolioAPI --> MemoryCache

    %% Styling Classes
    classDef frontend fill:#3b82f6,stroke:#1e40af,stroke-width:3px,color:#fff,font-weight:bold
    classDef backend fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff,font-weight:bold
    classDef database fill:#8b5cf6,stroke:#6d28d9,stroke-width:3px,color:#fff,font-weight:bold
    classDef external fill:#f59e0b,stroke:#d97706,stroke-width:3px,color:#000,font-weight:bold
    classDef storage fill:#ef4444,stroke:#dc2626,stroke-width:3px,color:#fff,font-weight:bold

    class NextJS,EdgeFunc,LivePrices,Backtest,DataSelection,Dashboard,StrategyBuilder,ManualMode,ChartViz,StateManagement,TypeSafety,TechIndicators,BuiltinStrategies,OptionsUI,ExitStrategy,RiskCalculator frontend
    class FastAPI,AuthAPI,BacktestAPI,PortfolioAPI,DataAPI,UserAPI,PricesAPI,CORS,AuthMiddleware,ErrorHandler,MechSimulator,ManualSimulator,BlackScholes,GreeksCalculator,TimeCalculator,IndicatorLibrary,SignalGenerator,PLCalculator,MetricsEngine,PositionManager,ORM,Models backend
    class UserTable,PortfolioTable,DatasetTable,ProfileTable,LineStyleTable,SettingsTable database
    class YFinance,SciPy external
    class FileSystem,MemoryCache,LocalStorage storage`

  return (
    <div className="mb-12 rounded-xl border border-white/10 bg-white/[0.02] p-8">
      <h2 className="mb-6 text-3xl font-bold text-white">System Architecture (You may have to zoom in to see details)</h2>

      <div className="mb-6 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-8">
        <MermaidDiagram chart={mermaidChart} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ArchitectureCard
          title="Frontend Layer"
          items={['Next.js 16 on Vercel', 'React 18 with TypeScript', 'Chart.js visualization', 'Responsive UI/UX']}
        />
        <ArchitectureCard
          title="Backend Layer"
          items={['FastAPI on Railway', '12 RESTful endpoints', 'PostgreSQL database', 'yfinance integration']}
        />
        <ArchitectureCard
          title="Data Flow"
          items={['CSV ingestion', 'Price data caching', 'Real-time calculations', 'Portfolio persistence']}
        />
      </div>
    </div>
  )
}

function ImpactSection() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8">
      <h2 className="mb-6 text-3xl font-bold text-white">Real-World Impact</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-xl font-semibold text-white">Active Users</h3>
          <p className="mb-4 text-zinc-300">
            Platform is actively used by members from quantitative finance organizations at
            University of Chicago, including:
          </p>
          <ul className="space-y-2 text-zinc-300">
            <li className="flex items-center">
              <CircleDot className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
              <strong>Maroon Capital</strong> - Student-run investment fund
            </li>
            <li className="flex items-center">
              <CircleDot className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
              <strong>Trott Business Leaders</strong> - Business strategy group
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xl font-semibold text-white">Use Cases</h3>
          <ul className="space-y-2 text-zinc-300">
            <li className="flex items-center">
              <BarChart3 className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
              Algorithmic strategy development and validation
            </li>
            <li className="flex items-center">
              <TrendingUp className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
              Historical market analysis and pattern recognition
            </li>
            <li className="flex items-center">
              <Lightbulb className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
              Options trading education and simulation
            </li>
            <li className="flex items-center">
              <Target className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
              Portfolio risk management testing
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white/[0.03] border border-white/10 p-4">
        <p className="text-center text-lg text-zinc-300">
          <strong className="text-white">Production URL:</strong>{' '}
          <a
            href="https://priorsystems.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-zinc-300 font-mono"
          >
            priorsystems.net
          </a>
        </p>
      </div>
    </div>
  )
}

// Helper Components
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-2 text-zinc-400">{icon}</div>
      <h4 className="mb-2 font-semibold text-white">{title}</h4>
      <p className="text-lg text-zinc-400">{description}</p>
    </div>
  )
}

function FeatureShowcase({
  title,
  description,
  features,
  imagePath,
  reverse = false,
}: {
  title: string
  description: string
  features: string[]
  imagePath: string
  reverse?: boolean
}) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className={reverse ? 'md:order-2' : ''}>
        <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-zinc-400">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-lg text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className={reverse ? 'md:order-1' : ''}>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <Image
            src={imagePath}
            alt={title}
            width={600}
            height={400}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

function ArchitectureCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <h4 className="mb-3 font-semibold text-white">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-lg text-zinc-300 flex items-center">
            <ArrowRight className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
