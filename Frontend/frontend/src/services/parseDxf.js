import DxfParser from "dxf-parser";

export const parseDxf = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parser = new DxfParser();
        const dxf = parser.parseSync(e.target.result);
        const entities = dxf.entities || [];

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const circles = entities.filter((en) => en.type === "CIRCLE");

        entities.forEach((en) => {
          if (en.vertices) {
            en.vertices.forEach((v) => {
              minX = Math.min(minX, v.x);
              minY = Math.min(minY, v.y);
              maxX = Math.max(maxX, v.x);
              maxY = Math.max(maxY, v.y);
            });
          }
          if (en.center) {
            minX = Math.min(minX, en.center.x - (en.radius || 0));
            minY = Math.min(minY, en.center.y - (en.radius || 0));
            maxX = Math.max(maxX, en.center.x + (en.radius || 0));
            maxY = Math.max(maxY, en.center.y + (en.radius || 0));
          }
        });

        const width  = isFinite(maxX) ? Math.round(maxX - minX) : 0;
        const height = isFinite(maxY) ? Math.round(maxY - minY) : 0;

        resolve({ width, height, holeCount: circles.length });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};