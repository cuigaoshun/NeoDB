import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export function SettingsPage() {
  const { t } = useTranslation();
  const { redisScanCount, setRedisScanCount, resetSettings } = useSettingsStore();

  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
          <Button variant="outline" size="sm" onClick={resetSettings}>
            <RotateCcw className="h-4 w-4 mr-2" />
            {t('settings.resetToDefault')}
          </Button>
        </div>

        {/* Redis Settings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">{t('settings.redis')}</h2>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="redisScanCount">{t('settings.redisScanCount')}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="redisScanCount"
                  type="number"
                  min={10}
                  max={10000}
                  value={redisScanCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 10 && val <= 10000) {
                      setRedisScanCount(val);
                    }
                  }}
                  className="w-32"
                />
                <span className="text-sm text-muted-foreground">
                  {t('settings.redisScanCountDesc')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
