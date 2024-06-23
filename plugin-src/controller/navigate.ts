export const navigateTo = async (nodeId: string) => {
  // NOTE: nodeを-から:に変換する必要あり
  let success = false;

  for (const page of figma.root.children) {
    await page.loadAsync();
    // console.log(
    //   `Page ${page.name} has ${page.children.length} children（${JSON.stringify(page.children)}）`
    // );
    // memo: creatorはfigmaで作成できない
    // try {
    //   const connector = figma.createConnector();
    //   console.log(`connector: ${JSON.stringify(connector)}`);
    // } catch (err) {
    //   console.log(`err: ${err}`);
    // }
    // const node4 = await figma.getNodeByIdAsync("2001:4");
    // console.log(`node4: ${JSON.stringify(node4 ? node4.type : "null")}`); // node4: "CONNECTOR"
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
