import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart3, 
  Lock, 
  Wallet, 
  PieChart, 
  CheckCircle2, 
  Smartphone,
  Shield,
  Zap,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                ExpenseWise
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 opacity-30 pointer-events-none"></div>
        <div className="absolute top-40 right-0 w-[400px] h-[300px] bg-green-500/10 rounded-full blur-[100px] -z-10 opacity-20 pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-8 hover:border-slate-700 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            New: Budget Planning Features
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Take Control of Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-gradient">
              Financial Future
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Stop wondering where your money went. ExpenseWise gives you the clarity you need to save more, spend less, and reach your goals faster.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5"
            >
              Log In
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
              alt="Dashboard Preview" 
              className="rounded-xl w-full h-auto opacity-80"
            />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
              <p className="text-slate-400 text-sm bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-md">
                Actual dashboard screenshot coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard value="10k+" label="Active Users" />
            <StatCard value="$2M+" label="Expenses Tracked" />
            <StatCard value="99.9%" label="Uptime" />
            <StatCard value="4.9/5" label="User Rating" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need to manage money</h2>
            <p className="text-slate-400">Powerful features packed into a simple, intuitive interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Wallet className="w-6 h-6 text-green-400" />}
              title="Expense Tracking"
              description="Log your daily expenses in seconds. Categorize transactions and keep your balance updated in real-time."
            />
            <FeatureCard
              icon={<PieChart className="w-6 h-6 text-purple-400" />}
              title="Visual Analytics"
              description="Understand where your money goes with beautiful, interactive charts. Spot trends and cut unnecessary costs."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-blue-400" />}
              title="Smart Budgeting"
              description="Set monthly limits for different categories. We'll verify your spending against your goals."
            />
            <FeatureCard
              icon={<Lock className="w-6 h-6 text-orange-400" />}
              title="Bank-Grade Security"
              description="Your financial data is encrypted and protected. We prioritize your privacy and data security above all."
            />
            <FeatureCard
              icon={<Smartphone className="w-6 h-6 text-pink-400" />}
              title="Mobile Friendly"
              description="Access your dashboard from anywhere. ExpenseWise works perfectly on desktop, tablet, and mobile devices."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              title="Lightning Fast"
              description="Built with modern tech for instant load times. No waiting around to see your balance."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Get started in minutes</h2>
            <p className="text-slate-400">Three simple steps to financial freedom.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>

            <StepCard 
              number="01" 
              title="Create Account" 
              description="Sign up for free in less than 30 seconds. No credit card required." 
            />
            <StepCard 
              number="02" 
              title="Add Transactions" 
              description="Log your income and expenses easily via our intuitive dashboard." 
            />
            <StepCard 
              number="03" 
              title="See Insights" 
              description="View detailed reports and charts to understand your spending habits." 
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 relative z-10">
            Ready to master your finances?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands of users who are already making smarter financial decisions with ExpenseWise.
          </p>
          <div className="relative z-10">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="font-bold text-xl text-slate-200">ExpenseWise</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Simple, secure, and smart expense tracking for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} ExpenseWise. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-600">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group">
    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="p-4">
    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{value}</div>
    <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{label}</div>
  </div>
);

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="relative p-6 bg-slate-800/50 rounded-2xl border border-slate-800 text-center hover:-translate-y-1 transition-transform">
    <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-blue-500/20">
      {number}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

export default LandingPage;
