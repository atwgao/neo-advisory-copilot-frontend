import {
  FileText,
  Boxes,
  MessageCircle,
  ScanSearch,
  BarChart2,
  FileSearch,
  Users,
  Settings,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import R2RServerCard from '@/components/ChatDemo/ServerCard';
import Layout from '@/components/Layout';
import RequestsCard from '@/components/RequestsCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { brandingConfig } from '@/config/brandingConfig';
import { useUserContext } from '@/context/UserContext';

const HomePage = () => {
  const router = useRouter();
  const { isAuthenticated, isSuperUser, pipeline } = useUserContext();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isSuperUser()) {
      router.replace('/documents');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout includeFooter>
      <main className="w-full flex flex-col container h-screen-[calc(100%-4rem)]">
        <div className="relative bg-white p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left column - Alert */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
              <Alert variant="default" className="flex flex-col">
                <AlertTitle className="text-lg ">
                  <div className="flex gap-2 text-xl">
                    <span className="text-text-primary font-semibold">
                      You're connected to your {brandingConfig.deploymentName}{' '}
                      deployment!
                    </span>
                  </div>
                </AlertTitle>
                <AlertDescription>
                  <p className="mb-4 text-sm text-text-body">
                    Here you will find tools to manage your knowledge base,
                    documents, and advisory copilot capabilities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">
                          Documents
                        </h3>
                        <p className="text-xs text-text-muted">
                          Upload, update, and delete documents and their
                          metadata.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Boxes className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">
                          Collections
                        </h3>
                        <p className="text-xs text-text-muted">
                          Manage and share groups of documents and create
                          knowledge graphs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">Chat</h3>
                        <p className="text-xs text-text-muted">
                          Generate RAG responses.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ScanSearch className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">Search</h3>
                        <p className="text-xs text-text-muted">
                          Conduct search over your documents and collections.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">Users</h3>
                        <p className="text-xs text-text-muted">
                          Track user queries, search results, and LLM responses.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FileSearch className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">Logs</h3>
                        <p className="text-xs text-text-muted">
                          Track user queries, search results, and LLM responses.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BarChart2 className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">
                          Analytics
                        </h3>
                        <p className="text-xs text-text-muted">
                          Rich analytics and insights on your users' queries and
                          interactions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Settings className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">Settings</h3>
                        <p className="text-xs text-text-muted">
                          Manage your {brandingConfig.deploymentName} deployment
                          settings and configurations.
                        </p>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>

            {/* Right column - Cards */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              {/* Server Cards */}
              <div className="flex flex-col gap-4 flex-grow">
                {pipeline && (
                  <R2RServerCard
                    pipeline={pipeline}
                    onStatusChange={setIsConnected}
                  />
                )}

                <div className="flex-grow">
                  <RequestsCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
