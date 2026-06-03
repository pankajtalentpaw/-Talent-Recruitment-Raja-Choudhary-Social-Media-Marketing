"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input, Select } from "@/components/common/FormFields";
import { DEFAULT_SETTINGS } from "@/constants/app";
import { useTimedFlag } from "@/hooks/useTimedFlag";
import type { AppSettings, PrivateMode, SettingsTab } from "@/types";
import { classNames } from "@/utils/classNames";

const FIELD_CLASS =
  "h-[40px] w-full rounded-[8px] border border-border bg-[#0A0A16] px-[12px] font-outfit text-[13px] text-white outline-none transition-all duration-200 placeholder:text-muted focus:border-gold focus:shadow-input-focus";

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
  const [privateMode, setPrivateMode] = useState<PrivateMode>(settings.privateMode);
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
    onUpdateSettings({ ...settings, privateMode, privateToken: token });
    setPrivateToken(token);

    if (privateMode === "url") {
      const publicUrl = new URL("/", window.location.origin);
      publicUrl.searchParams.set("access", token);
      setPrivateLink(publicUrl.toString());
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
        "border-b border-border bg-[rgba(7,7,16,0.7)] [border-bottom-width:0.5px]",
        open ? "block" : "hidden",
      )}
    >
      {/* Settings header */}
      <div className="flex flex-col justify-between gap-[12px] border-b border-border px-[16px] py-[14px] [border-bottom-width:0.5px] md:flex-row md:items-center">
        <div>
          <div className="text-[8.5px] font-semibold uppercase tracking-[2.5px] text-muted">
            Configuration
          </div>
          <h4 className="mt-[3px] font-serif text-[20px] leading-none text-text">
            Settings
          </h4>
        </div>

        {/* Tabs */}
        <div className="inline-flex w-fit rounded-[8px] border border-border bg-card p-[3px] [border-width:0.5px]">
          <TabBtn active={activeTab === "criteria"} onClick={() => setActiveTab("criteria")}>
            <FilterIcon />
            Criteria
          </TabBtn>
          <TabBtn active={activeTab === "private"} onClick={() => setActiveTab("private")}>
            <LockIcon />
            Access
          </TabBtn>
        </div>
      </div>

      {/* Tab content */}
      <div className="px-[16px] py-[16px]">
        {activeTab === "criteria" && (
          <div>
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
              <SettingItem label="Influencer Min. Followers" hint="Minimum for influencer applicants">
                <Input
                  type="number"
                  className={FIELD_CLASS}
                  value={infMin}
                  placeholder="e.g. 5000"
                  onChange={(e) => setInfMin(e.target.value)}
                />
              </SettingItem>
              <SettingItem label="Creator Min. Followers" hint="Minimum for content creators">
                <Input
                  type="number"
                  className={FIELD_CLASS}
                  value={ccMin}
                  placeholder="e.g. 1000"
                  onChange={(e) => setCcMin(e.target.value)}
                />
              </SettingItem>
              <SettingItem label="Intern Min. Followers" hint="Minimum for intern applicants">
                <Input
                  type="number"
                  className={FIELD_CLASS}
                  value={intMin}
                  placeholder="e.g. 0"
                  onChange={(e) => setIntMin(e.target.value)}
                />
              </SettingItem>
              <SettingItem label="Highlight Above" hint="Highlight high-follower applicants">
                <Input
                  type="number"
                  className={FIELD_CLASS}
                  value={highlight}
                  placeholder="e.g. 10000"
                  onChange={(e) => setHighlight(e.target.value)}
                />
              </SettingItem>
            </div>

            <div className="mt-[14px] flex flex-wrap items-center gap-[10px]">
              <SaveButton onClick={saveCriteria}>Save Criteria</SaveButton>
              {criteriaSaved.visible && <SavedBadge>Saved</SavedBadge>}
            </div>
          </div>
        )}

        {activeTab === "private" && (
          <div>
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
              <SettingItem label="Private Mode" hint="Control who can view the public site">
                <Select
                  className={FIELD_CLASS}
                  value={privateMode}
                  onChange={(e) => setPrivateMode(e.target.value as PrivateMode)}
                >
                  <option value="off">Off (Public)</option>
                  <option value="url">URL Token</option>
                  <option value="code">Access Code</option>
                </Select>
              </SettingItem>
              <SettingItem label="Token / Code" hint="The access value to share">
                <Input
                  className={FIELD_CLASS}
                  value={privateToken}
                  placeholder="e.g. clapstick2025"
                  onChange={(e) => setPrivateToken(e.target.value)}
                />
              </SettingItem>
            </div>

            <div className="mt-[14px] flex flex-wrap items-center gap-[10px]">
              <SaveButton onClick={savePrivateSettings}>Save Access</SaveButton>
              {privateSaved.visible && <SavedBadge>Saved</SavedBadge>}
            </div>

            {privateLink && (
              <div className="mt-[14px] rounded-[10px] border border-[rgba(212,168,67,0.2)] bg-gold-dim px-[16px] py-[14px]">
                <div className="mb-[6px] flex items-center gap-[6px]">
                  <div className="text-[9px] font-semibold uppercase tracking-[1.8px] text-gold">
                    Share Value
                  </div>
                </div>
                <div className="mb-[10px] break-all text-[12px] text-text-dim">
                  {privateLink}
                </div>
                <Button
                  className="flex items-center gap-[6px] rounded-[7px] border border-[rgba(212,168,67,0.3)] bg-transparent px-[12px] py-[7px] text-[11px] font-medium text-gold transition-all duration-200 hover:bg-gold hover:text-bg"
                  onClick={copyPrivateLink}
                >
                  {copied.visible ? (
                    <>
                      <CheckIcon />
                      Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      className={classNames(
        "flex items-center gap-[6px] rounded-[6px] px-[12px] py-[7px] text-[11px] font-medium transition-all duration-200",
        active
          ? "bg-gold text-bg shadow-gold-soft"
          : "bg-transparent text-muted hover:text-text",
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function SettingItem({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-[5px] block text-[10px] font-semibold uppercase tracking-[1.4px] text-muted-light">
        {label}
      </span>
      {hint && (
        <span className="mb-[6px] block text-[10px] text-muted">{hint}</span>
      )}
      {children}
    </label>
  );
}

function SaveButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      className="rounded-[8px] border border-[rgba(212,168,67,0.3)] bg-gold-dim px-[16px] py-[9px] text-[12px] font-semibold text-gold transition-all duration-200 hover:bg-gold hover:text-bg"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function SavedBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[5px] rounded-[7px] border border-[rgba(46,204,122,0.25)] bg-green-dim px-[10px] py-[7px] text-[11px] font-medium text-green">
      <CheckIcon />
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-[12px] w-[12px]" fill="none" viewBox="0 0 24 24">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" className="h-[12px] w-[12px]" fill="none" viewBox="0 0 24 24">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg aria-hidden="true" className="h-[12px] w-[12px]" fill="none" viewBox="0 0 24 24">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="h-[12px] w-[12px]" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}
