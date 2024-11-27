async function fetchWithConcurrency(urls: string[], limit: number): Promise<any[]> {
    const results: any[] = [];
    const queue = [...urls];
    const workers = new Array(limit).fill(null).map(async () => {
      while (queue.length > 0) {
        const url = queue.shift();
        if (url) {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              console.warn(`Error fetching ${url}: ${response.status}`);
              continue;
            }
            results.push(await response.json());
          } catch (error) {
            console.error(`Error fetching ${url}:`, error);
          }
        }
      }
    });
    await Promise.all(workers);
    return results;
  } 
  
  export default fetchWithConcurrency;