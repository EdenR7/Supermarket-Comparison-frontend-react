import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ChangeProductQty() {
  return (
    <div className="flex items-center gap-2 justify-between">
      <Button variant="outline" className="text-sm px-2">
        <Minus size={14} />
      </Button>
      <Input className="max-w-24 text-center" />
      <Button variant="outline" className="text-sm px-2">
        <Plus size={14} />
      </Button>
    </div>
  );
}

export default ChangeProductQty;
