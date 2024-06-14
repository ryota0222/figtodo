export const navigateTo = async (nodeId: string) => {
  // NOTE: nodeを-から:に変換する必要あり
  let success = false;

  for (const page of figma.root.children) {
    await page.loadAsync();
    console.log(JSON.stringify(page.children, null, 2));
    console.log(`Page ${page.name} has ${page.children.length} children`);
    const node = page.findChild((node) => node.id === nodeId);
    if (node) {
      await figma.setCurrentPageAsync(page);
      figma.viewport.scrollAndZoomIntoView([node]);
      success = true;
      break;
    }
  }
  if (!success) {
    figma.notify(
      "Unable to navigate to the link. Please update the link and try again.",
      {
        error: true,
      }
    );
  } else {
    figma.notify("Successfully navigated to the link.");
    figma.closePlugin();
  }
};
