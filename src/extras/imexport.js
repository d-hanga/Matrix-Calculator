const exportasjson = (map) => {
    const str = JSON.stringify(Object.fromEntries(map));
    const blob = new Blob([str], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "matrices.json";
    link.click();
    URL.revokeObjectURL(link.href);
};

export default exportasjson;