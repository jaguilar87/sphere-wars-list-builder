import { Card, CardBody } from "@heroui/card";

export function SelectableCard({
  children,
  onPress = () => {},
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Card
      isPressable
      shadow="sm"
      onPress={onPress}
      className="lg:w-[48%] w-full hover:bg-slate-900"
    >
      <CardBody className="overflow-visible">{children}</CardBody>
    </Card>
  );
}
