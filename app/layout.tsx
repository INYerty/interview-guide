import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';

export const metadata: Metadata = {
  title: '智能面试平台 - AI驱动的面试准备工具',
  description: '通过AI模拟面试、题库练习和个性化反馈，全面提升您的面试表现',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-950 text-white min-h-screen font-sans">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
