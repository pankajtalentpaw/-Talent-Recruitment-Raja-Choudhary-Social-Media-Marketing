import { SectionDivider } from "@/components/common/SectionDivider";
import { OPEN_POSITIONS } from "@/constants/app";
import { RoleCard } from "./RoleCard";

export function RolesSection() {
  return (
    <>
      <SectionDivider>Open Positions</SectionDivider>
      <div
        id="positions"
        className="mx-auto grid max-w-[900px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[12px] px-[52px] pb-[64px] pt-0 max-sm:px-[18px]"
      >
        {OPEN_POSITIONS.map((position) => (
          <RoleCard key={position.number} {...position} />
        ))}
      </div>
    </>
  );
}
