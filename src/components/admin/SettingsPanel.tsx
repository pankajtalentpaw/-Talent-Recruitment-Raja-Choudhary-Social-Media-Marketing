"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input, Select } from "@/components/common/FormFields";
import { DEFAULT_SETTINGS } from "@/constants/app";
import { useTimedFlag } from "@/hooks/useTimedFlag";
import type { AppSettings, PrivateMode, SettingsTab } from "@/types";
import { classNames } from "@/utils/classNames";

const SETTING_FIELD_CLASS =
  "w-full rounded-[8px] border border-border bg-card px-[12px] py-[8px] font-outfit text-[12px] text-white outline-none transition-colors duration-200 focus:border-gold";

interface SettingsPanelProps {
  open: boolean;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

export function SettingsPanel({
  open,
  settings,
  onUpdateSettings,
}: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("criteria");
  const [infMin, setInfMin] = useState(String(settings.infMin));
  const [ccMin, setCcMin] = useState(String(settings.ccMin));
  const [intMin, setIntMin] = useState(String(settings.intMin));
  const [highlight, setHighlight] = useState(String(settings.highlight));
  const [privateMode, setPrivateMode] = useState<PrivateMode>(
    settings.privateMode,
  );
  const [privateToken, setPrivateToken] = useState(settings.privateToken);
  const [privateLink, setPrivateLink] = useState("");
  const criteriaSaved = useTimedFlag();
  const privateSaved = useTimedFlag();
  const copied = useTimedFlag(2000);

  useEffect(() => {
    setInfMin(String(settings.infMin));
    setCcMin(String(settings.ccMin));
    setIntMin(String(settings.intMin));
    setHighlight(String(settings.highlight));
    setPrivateMode(settings.privateMode);
    setPrivateToken(settings.privateToken);
  }, [settings]);

  function saveCriteria() {
    onUpdateSettings({
      ...settings,
      infMin: parseInt(infMin) || 0,
      ccMin: parseInt(ccMin) || 0,
      intMin: parseInt(intMin) || 0,
      highlight: parseInt(highlight) || 10000,
    });
    criteriaSaved.show();
  }

  function savePrivateSettings() {
    const token = privateToken.trim() || DEFAULT_SETTINGS.privateToken;
    onUpdateSettings({
      ...settings,
      privateMode,
      privateToken: token,
    });
    setPrivateToken(token);

    if (privateMode === "url") {
      const base = window.location.href.split("?")[0];
      setPrivateLink(`${base}?access=${encodeURIComponent(token)}`);
    } else if (privateMode === "code") {
      setPrivateLink(`Access Code: ${token}`);
    } else {
      setPrivateLink("");
    }

    privateSaved.show();
  }

  function copyPrivateLink() {
    navigator.clipboard.writeText(privateLink).then(() => copied.show());
  }

  return (
    <section
      className={classNames(
        "shrink-0 border-b border-border bg-surface px-[24px] py-[20px] [border-bottom-width:0.5px]",
        open ? "block" : "hidden",
      )}
    >
      <div className="mb-[16px] flex gap-[6px]">
        <SettingsTabButton
          active={activeTab === "criteria"}
          onClick={() => setActiveTab("criteria")}
        >
          Follower Criteria
        </SettingsTabButton>
        <SettingsTabButton
          active={activeTab === "private"}
          onClick={() => setActiveTab("private")}
        >
          Private Link
        </SettingsTabButton>
      </div>

      {activeTab === "criteria" ? (
        <div>
          <div className="grid grid-cols-2 gap-[10px] max-sm:grid-cols-1">
            <SettingItem label="Influencer Min. Followers">
              <Input
                type="number"
                className={SETTING_FIELD_CLASS}
                value={infMin}
                placeholder="e.g. 5000"
                onChange={(event) => setInfMin(event.target.value)}
              />
            </SettingItem>
            <SettingItem label="Content Creator Min. Followers">
              <Input
                type="number"
                className={SETTING_FIELD_CLASS}
                value={ccMin}
                placeholder="e.g. 1000"
                onChange={(event) => setCcMin(event.target.value)}
              />
            </SettingItem>
            <SettingItem label="Intern Min. Followers">
              <Input
                type="number"
                className={SETTING_FIELD_CLASS}
                value={intMin}
                placeholder="e.g. 0"
                onChange={(event) => setIntMin(event.target.value)}
              />
            </SettingItem>
            <SettingItem label="Highlight applicants above">
              <Input
                type="number"
                className={SETTING_FIELD_CLASS}
                value={highlight}
                placeholder="e.g. 10000"
                onChange={(event) => setHighlight(event.target.value)}
              />
            </SettingItem>
          </div>
          <div className="mt-[8px] text-[11px] text-muted">
            These are display-only criteria shown in admin. All applications are
            still accepted.
          </div>
          <SaveSettingsButton onClick={saveCriteria}>
            Save Criteria
          </SaveSettingsButton>
          {criteriaSaved.visible ? (
            <SavedMessage>✓ Saved successfully</SavedMessage>
          ) : null}
        </div>
      ) : null}

      {activeTab === "private" ? (
        <div>
          <div className="grid grid-cols-2 gap-[10px] max-sm:grid-cols-1">
            <SettingItem label="Private Mode">
              <Select
                className={SETTING_FIELD_CLASS}
                value={privateMode}
                onChange={(event) =>
                  setPrivateMode(event.target.value as PrivateMode)
                }
              >
                <option value="off">Off (Public)</option>
                <option value="url">URL Token (share link)</option>
                <option value="code">Access Code (enter on page)</option>
              </Select>
            </SettingItem>
            <SettingItem label="Token / Code Value">
              <Input
                className={SETTING_FIELD_CLASS}
                value={privateToken}
                placeholder="e.g. clapstick2025"
                onChange={(event) => setPrivateToken(event.target.value)}
              />
            </SettingItem>
          </div>
          <SaveSettingsButton onClick={savePrivateSettings}>
            Save & Generate Link
          </SaveSettingsButton>
          {privateLink ? (
            <div className="mt-[10px] break-all rounded-[8px] border border-[rgba(212,168,67,0.15)] bg-[rgba(212,168,67,0.05)] px-[16px] py-[12px] text-[12px] text-muted">
              <strong className="mb-[4px] block text-[11px] uppercase tracking-[1px] text-gold">
                Your Private Link
              </strong>
              <span>{privateLink}</span>
              <br />
              <Button
                className="mt-[8px] rounded-[6px] border border-[rgba(212,168,67,0.3)] bg-transparent px-[12px] py-[5px] text-[11px] text-gold transition-all duration-200 hover:bg-gold-dim"
                onClick={copyPrivateLink}
              >
                {copied.visible ? "✓ Copied!" : "Copy Link"}
              </Button>
            </div>
          ) : null}
          {privateSaved.visible ? (
            <SavedMessage>✓ Settings saved</SavedMessage>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

interface SettingsTabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function SettingsTabButton({
  active,
  onClick,
  children,
}: SettingsTabButtonProps) {
  return (
    <Button
      className={classNames(
        "rounded-[6px] border border-border bg-transparent px-[12px] py-[5px] text-[11px] text-muted transition-all duration-200 hover:border-gold hover:text-gold",
        active && "border-gold text-gold",
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function SettingItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-[5px] block text-[11px] text-muted">{label}</span>
      {children}
    </label>
  );
}

function SaveSettingsButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      className="mt-[10px] rounded-[8px] border border-[rgba(212,168,67,0.3)] bg-gold-dim px-[18px] py-[8px] text-[12px] text-gold transition-all duration-200 hover:bg-gold hover:text-bg"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function SavedMessage({ children }: { children: React.ReactNode }) {
  return <div className="mt-[6px] text-[11px] text-green">{children}</div>;
}
