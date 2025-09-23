import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowDown, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Users, Clock, MessageSquare } from "lucide-react";

interface BuildingBlock {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'decision' | 'outcome';
  icon?: React.ReactNode;
}

interface FlowChartProps {
  title: string;
  blocks: BuildingBlock[];
  connections: { from: string; to: string; condition?: string }[];
}

export function EmailFlowChart({ title, blocks, connections }: FlowChartProps) {
  const getBlockStyle = (type: string) => {
    switch (type) {
      case 'action':
        return 'border-blue-200 bg-blue-50 hover:bg-blue-100';
      case 'decision':
        return 'border-orange-200 bg-orange-50 hover:bg-orange-100';
      case 'outcome':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      default:
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'action':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'decision':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'outcome':
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  // Helper function to determine the display position in the snake pattern
  const getDisplayPosition = (index: number, totalBlocks: number) => {
    const columnsPerRow = 3;
    const rowIndex = Math.floor(index / columnsPerRow);
    const columnIndex = index % columnsPerRow;
    
    // For even rows (0, 2, 4...), go left to right
    // For odd rows (1, 3, 5...), go right to left
    const isOddRow = rowIndex % 2 === 1;
    const displayColumn = isOddRow ? (columnsPerRow - 1 - columnIndex) : columnIndex;
    
    return {
      row: rowIndex,
      column: displayColumn,
      isOddRow
    };
  };

  // Helper function to get the next block index in the snake pattern
  const getNextBlockIndex = (currentIndex: number, totalBlocks: number) => {
    if (currentIndex >= totalBlocks - 1) return null;
    return currentIndex + 1;
  };

  // Helper function to determine arrow direction and position
  const getArrowComponent = (currentIndex: number, totalBlocks: number) => {
    const nextIndex = getNextBlockIndex(currentIndex, totalBlocks);
    if (nextIndex === null) return null;

    const currentPos = getDisplayPosition(currentIndex, totalBlocks);
    const nextPos = getDisplayPosition(nextIndex, totalBlocks);

    // If moving to next row (down arrow)
    if (currentPos.row !== nextPos.row) {
      return (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4">
          <ArrowDown className="w-5 h-5 text-gray-400" />
        </div>
      );
    }
    
    // If staying on same row
    const isMovingRight = nextPos.column > currentPos.column;
    
    if (isMovingRight) {
      return (
        <div className="absolute top-1/2 -right-10 transform -translate-y-1/2">
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
      );
    } else {
      return (
        <div className="absolute top-1/2 -left-10 transform -translate-y-1/2">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </div>
      );
    }
  };

  // Helper function to get condition badge position
  const getConditionBadge = (currentIndex: number, blockId: string, totalBlocks: number) => {
    const connection = connections.find(c => c.from === blockId);
    if (!connection?.condition) return null;

    const nextIndex = getNextBlockIndex(currentIndex, totalBlocks);
    if (nextIndex === null) return null;

    const currentPos = getDisplayPosition(currentIndex, totalBlocks);
    const nextPos = getDisplayPosition(nextIndex, totalBlocks);

    // If moving to next row (below down arrow)
    if (currentPos.row !== nextPos.row) {
      return (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8">
          <Badge variant="outline" className="text-xs whitespace-nowrap bg-white">
            {connection.condition}
          </Badge>
        </div>
      );
    }
    
    // If staying on same row
    const isMovingRight = nextPos.column > currentPos.column;
    
    if (isMovingRight) {
      return (
        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 translate-x-full">
          <Badge variant="outline" className="text-xs whitespace-nowrap bg-white">
            {connection.condition}
          </Badge>
        </div>
      );
    } else {
      return (
        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 -translate-x-full">
          <Badge variant="outline" className="text-xs whitespace-nowrap bg-white">
            {connection.condition}
          </Badge>
        </div>
      );
    }
  };

  // Create grid items with proper positioning
  const gridItems = blocks.map((block, index) => {
    const position = getDisplayPosition(index, blocks.length);
    
    return {
      block,
      index,
      gridColumn: position.column + 1,
      gridRow: position.row + 1,
      position
    };
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="mb-2">{title}</h2>
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
            <span className="text-sm text-muted-foreground">Action</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-100 border border-orange-200 rounded"></div>
            <span className="text-sm text-muted-foreground">Decision</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-sm text-muted-foreground">Outcome</span>
          </div>
        </div>
      </div>

      <div 
        className="grid gap-20 relative"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: 'auto'
        }}
      >
        {gridItems.map(({ block, index, gridColumn, gridRow }) => (
          <div 
            key={block.id} 
            className="relative"
            style={{
              gridColumn: `${gridColumn} / ${gridColumn + 1}`,
              gridRow: `${gridRow} / ${gridRow + 1}`
            }}
          >
            <Card className={`transition-colors cursor-pointer ${getBlockStyle(block.type)} h-full`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  {block.icon || getIcon(block.type)}
                  <CardTitle className="text-base leading-tight">{block.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {block.description}
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Flow arrows and condition badges */}
            {getArrowComponent(index, blocks.length)}
            {getConditionBadge(index, block.id, blocks.length)}
          </div>
        ))}
      </div>
    </div>
  );
}