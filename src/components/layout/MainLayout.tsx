import { Sidebar } from "./Sidebar";
import { TabBar } from "./TabBar";
import { MysqlWorkspace } from "../workspace/MysqlWorkspace";
import { RedisWorkspace } from "../workspace/RedisWorkspace";
import { useAppStore } from "@/store/useAppStore";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { useTranslation } from "react-i18next";
import { AppMenubar } from "./AppMenubar";

export function MainLayout() {
  const activeTabId = useAppStore((state) => state.activeTabId);
  const tabs = useAppStore((state) => state.tabs);
  const { t } = useTranslation();
  
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col">
      {/* Top Header Region (Menubar) */}
      <div className="border-b">
         <AppMenubar />
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="min-w-[200px]">
            <Sidebar />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={80}>
            <div className="h-full flex flex-col">
              <TabBar />
              <div className="flex-1 bg-white dark:bg-zinc-900 overflow-hidden relative">
                {activeTab ? (
                  activeTab.type === 'mysql' ? (
                    <MysqlWorkspace key={activeTab.id} name={activeTab.title} />
                  ) : (
                    <RedisWorkspace key={activeTab.id} name={activeTab.title} />
                  )
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">{t('common.noActiveConnection')}</h3>
                      <p className="text-sm">{t('common.selectConnection')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
