import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarCheckboxItem,
} from "@/components/ui/menubar";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppMenubar() {
  const { t, i18n } = useTranslation();
  const { setTheme, theme } = useTheme();
  const [isNewConnOpen, setIsNewConnOpen] = useState(false);
  const addConnection = useAppStore((state) => state.addConnection);

  // Mock form state
  const [newConnName, setNewConnName] = useState("");
  const [newConnType, setNewConnType] = useState<"mysql" | "redis">("mysql");

  const handleCreateConnection = () => {
      addConnection({
          id: Date.now().toString(),
          name: newConnName || "New Connection",
          type: newConnType,
          host: "localhost",
          port: newConnType === 'mysql' ? 3306 : 6379
      });
      setIsNewConnOpen(false);
      setNewConnName("");
  };

  return (
    <>
      <Menubar className="rounded-none border-b border-none px-2 lg:px-4 bg-background">
        <MenubarMenu>
          <MenubarTrigger className="font-bold">{t('menu.file')}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setIsNewConnOpen(true)}>
              {t('menu.newConnection')} <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              {t('menu.exit')} <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>{t('menu.edit')}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>{t('menu.view')}</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>{t('common.theme')}</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarRadioGroup value={theme}>
                    <MenubarRadioItem value="light" onClick={() => setTheme("light")}>Light</MenubarRadioItem>
                    <MenubarRadioItem value="dark" onClick={() => setTheme("dark")}>Dark</MenubarRadioItem>
                    <MenubarRadioItem value="system" onClick={() => setTheme("system")}>System</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarSubContent>
            </MenubarSub>
             <MenubarSub>
              <MenubarSubTrigger>{t('common.language')}</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarRadioGroup value={i18n.language}>
                    <MenubarRadioItem value="zh" onClick={() => i18n.changeLanguage('zh')}>中文</MenubarRadioItem>
                    <MenubarRadioItem value="en" onClick={() => i18n.changeLanguage('en')}>English</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
            <MenubarTrigger>{t('menu.help')}</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>{t('menu.about')}</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Dialog open={isNewConnOpen} onOpenChange={setIsNewConnOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('menu.newConnection')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right text-sm">Name</span>
              <Input
                id="name"
                value={newConnName}
                onChange={(e) => setNewConnName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
               <span className="text-right text-sm">Type</span>
               <div className="col-span-3 flex gap-2">
                   <Button 
                    variant={newConnType === 'mysql' ? 'default' : 'outline'} 
                    onClick={() => setNewConnType('mysql')}
                    size="sm"
                   >
                    MySQL
                   </Button>
                   <Button 
                    variant={newConnType === 'redis' ? 'default' : 'outline'} 
                    onClick={() => setNewConnType('redis')}
                    size="sm"
                   >
                    Redis
                   </Button>
               </div>
            </div>
          </div>
          <div className="flex justify-end">
              <Button onClick={handleCreateConnection}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
