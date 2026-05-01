import { Question } from '@/types';

export const questions: Question[] = [
  // ==================== 算法 ====================
  {
    id: 'algo-1',
    title: '二分查找',
    description:
      '给定一个升序排列的整数数组 nums 和一个目标值 target，请实现二分查找算法，返回 target 在数组中的下标。若不存在则返回 -1。要求时间复杂度为 O(log n)。\n\n示例：\n- 输入：nums = [-1,0,3,5,9,12], target = 9 → 输出：4\n- 输入：nums = [-1,0,3,5,9,12], target = 2 → 输出：-1',
    category: '算法',
    difficulty: 'Easy',
    tags: ['二分查找', '数组', '搜索'],
    hints: [
      '使用两个指针 left 和 right 分别指向数组的首尾',
      '每次取中间值 mid = (left + right) / 2 进行比较',
      '若 nums[mid] < target，则目标在右半部分，令 left = mid + 1',
      '注意避免整数溢出，可使用 mid = left + (right - left) / 2',
    ],
    sampleAnswer:
      '二分查找的核心思路是每次将搜索范围缩小一半。\n\n```python\ndef binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```\n\n时间复杂度：O(log n)，空间复杂度：O(1)。\n\n关键点：\n1. 循环条件用 left <= right（闭区间）\n2. 避免溢出用 left + (right - left) // 2\n3. 更新边界时要 +1 或 -1，避免死循环',
    relatedQuestions: ['algo-2', 'algo-7'],
    timeLimit: 300,
  },
  {
    id: 'algo-2',
    title: '快速排序',
    description:
      '请实现快速排序算法，对给定整数数组进行原地排序。要求分析最好、最坏和平均时间复杂度，并说明如何选择pivot以避免最坏情况。\n\n示例：\n- 输入：[3,6,8,10,1,2,1] → 输出：[1,1,2,3,6,8,10]',
    category: '算法',
    difficulty: 'Medium',
    tags: ['排序', '分治', '递归'],
    hints: [
      '选择一个基准元素（pivot），将数组分为小于和大于pivot的两部分',
      '递归地对两个子数组进行排序',
      '可以随机选择pivot或选择三数取中来避免最坏情况',
      '原地划分可使用双指针法',
    ],
    sampleAnswer:
      '快速排序使用分治策略，平均时间复杂度 O(n log n)，最坏 O(n²)。\n\n```python\ndef quicksort(arr, low, high):\n    if low < high:\n        pivot_idx = partition(arr, low, high)\n        quicksort(arr, low, pivot_idx - 1)\n        quicksort(arr, pivot_idx + 1, high)\n\ndef partition(arr, low, high):\n    # 三数取中优化\n    mid = low + (high - low) // 2\n    if arr[low] > arr[mid]: arr[low], arr[mid] = arr[mid], arr[low]\n    if arr[low] > arr[high]: arr[low], arr[high] = arr[high], arr[low]\n    if arr[mid] > arr[high]: arr[mid], arr[high] = arr[high], arr[mid]\n    pivot = arr[mid]\n    arr[mid], arr[high] = arr[high], arr[mid]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i+1], arr[high] = arr[high], arr[i+1]\n    return i + 1\n```\n\n优化策略：随机化pivot、三数取中、小数组用插入排序。',
    relatedQuestions: ['algo-9', 'algo-1'],
    timeLimit: 600,
  },
  {
    id: 'algo-3',
    title: '动态规划-背包问题',
    description:
      '给定 n 个物品，每个物品有重量 w[i] 和价值 v[i]，背包容量为 W。请用动态规划求解0-1背包问题：在不超过背包容量的前提下，选取物品使总价值最大。\n\n示例：\n- n=4, W=5, w=[1,2,3,2], v=[1,6,10,16] → 最大价值：22',
    category: '算法',
    difficulty: 'Hard',
    tags: ['动态规划', '背包', '优化'],
    hints: [
      '定义 dp[i][j] 为考虑前i个物品，容量为j时的最大价值',
      '状态转移：dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])',
      '可以用一维数组优化空间复杂度，注意遍历顺序（从大到小）',
      '0-1背包每个物品只能选一次，完全背包可以无限次选',
    ],
    sampleAnswer:
      '0-1背包是经典DP问题。\n\n二维DP解法：\n```python\ndef knapsack(W, weights, values, n):\n    dp = [[0]*(W+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for j in range(W+1):\n            dp[i][j] = dp[i-1][j]\n            if j >= weights[i-1]:\n                dp[i][j] = max(dp[i][j], dp[i-1][j-weights[i-1]] + values[i-1])\n    return dp[n][W]\n```\n\n空间优化为一维：\n```python\ndef knapsack_1d(W, weights, values, n):\n    dp = [0] * (W + 1)\n    for i in range(n):\n        for j in range(W, weights[i]-1, -1):  # 逆序遍历\n            dp[j] = max(dp[j], dp[j-weights[i]] + values[i])\n    return dp[W]\n```\n\n时间复杂度 O(nW)，一维空间复杂度 O(W)。',
    relatedQuestions: ['algo-6'],
    timeLimit: 900,
  },
  {
    id: 'algo-4',
    title: '链表反转',
    description:
      '给定单链表的头节点 head，请反转链表并返回新的头节点。要求实现迭代和递归两种方法。\n\n示例：\n- 输入：1 → 2 → 3 → 4 → 5 → null\n- 输出：5 → 4 → 3 → 2 → 1 → null',
    category: '算法',
    difficulty: 'Easy',
    tags: ['链表', '指针', '递归'],
    hints: [
      '迭代法：使用 prev、curr、next 三个指针逐步反转',
      '递归法：先递归反转后半部分，再处理当前节点',
      '注意处理空链表和单节点链表的边界情况',
    ],
    sampleAnswer:
      '迭代法（推荐）：\n```python\ndef reverse_list(head):\n    prev, curr = None, head\n    while curr:\n        next_node = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_node\n    return prev\n```\n\n递归法：\n```python\ndef reverse_list_recursive(head):\n    if not head or not head.next:\n        return head\n    new_head = reverse_list_recursive(head.next)\n    head.next.next = head\n    head.next = None\n    return new_head\n```\n\n时间复杂度均为 O(n)，迭代空间 O(1)，递归空间 O(n)（栈帧）。',
    relatedQuestions: ['algo-1', 'algo-5'],
    timeLimit: 300,
  },
  {
    id: 'algo-5',
    title: '二叉树层序遍历',
    description:
      '给定二叉树的根节点 root，请实现层序遍历（BFS），返回每层节点值组成的二维数组。\n\n示例：\n- 输入：root = [3,9,20,null,null,15,7]\n- 输出：[[3],[9,20],[15,7]]',
    category: '算法',
    difficulty: 'Medium',
    tags: ['树', 'BFS', '队列'],
    hints: [
      '使用队列（Queue）辅助实现BFS',
      '每次处理完当前层的所有节点后，将下一层入队',
      '可以用队列的当前长度来区分每一层的节点数',
    ],
    sampleAnswer:
      '使用队列实现BFS层序遍历：\n\n```python\nfrom collections import deque\n\ndef level_order(root):\n    if not root:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        level_size = len(queue)\n        level = []\n        for _ in range(level_size):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n        result.append(level)\n    return result\n```\n\n时间复杂度 O(n)，空间复杂度 O(n)（队列最大存储一层节点）。',
    relatedQuestions: ['algo-8'],
    timeLimit: 600,
  },
  {
    id: 'algo-6',
    title: '最长公共子序列',
    description:
      '给定两个字符串 text1 和 text2，返回它们的最长公共子序列（LCS）的长度。子序列不要求连续，但需保持相对顺序。\n\n示例：\n- text1="abcde", text2="ace" → 3（"ace"）\n- text1="abc", text2="abc" → 3\n- text1="abc", text2="def" → 0',
    category: '算法',
    difficulty: 'Hard',
    tags: ['动态规划', '字符串', 'LCS'],
    hints: [
      '定义 dp[i][j] 为 text1 前i字符和 text2 前j字符的LCS长度',
      '若 text1[i-1] == text2[j-1]，则 dp[i][j] = dp[i-1][j-1] + 1',
      '否则 dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
    ],
    sampleAnswer:
      'LCS经典DP解法：\n\n```python\ndef longest_common_subsequence(text1, text2):\n    m, n = len(text1), len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i-1] == text2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\n```\n\n时间复杂度 O(mn)，空间复杂度 O(mn)，可优化为 O(n)。\n\n实际应用：diff工具、版本控制系统的文件差异比较。',
    relatedQuestions: ['algo-3'],
    timeLimit: 900,
  },
  {
    id: 'algo-7',
    title: '两数之和',
    description:
      '给定整数数组 nums 和目标值 target，找出数组中和为 target 的两个数的下标（每个输入只有一个答案，同一元素不能使用两次）。\n\n示例：\n- 输入：nums=[2,7,11,15], target=9 → 输出：[0,1]\n- 输入：nums=[3,2,4], target=6 → 输出：[1,2]',
    category: '算法',
    difficulty: 'Easy',
    tags: ['哈希表', '数组', '查找'],
    hints: [
      '暴力解法 O(n²)：双层循环枚举所有组合',
      '哈希表优化到 O(n)：遍历时存储 (target - nums[i]) 的映射',
      '遍历时先查哈希表是否有补数，有则返回，没有则将当前值存入',
    ],
    sampleAnswer:
      '哈希表解法（最优）：\n\n```python\ndef two_sum(nums, target):\n    seen = {}  # value -> index\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n```\n\n时间复杂度 O(n)，空间复杂度 O(n)。\n\n这是哈希表以空间换时间的经典应用，面试高频题。',
    relatedQuestions: ['algo-1'],
    timeLimit: 300,
  },
  {
    id: 'algo-8',
    title: '图的深度优先搜索',
    description:
      '给定无向图（邻接表表示），请实现深度优先搜索（DFS），判断图中是否存在从起点 src 到终点 dst 的路径。同时分析DFS与BFS的区别及适用场景。',
    category: '算法',
    difficulty: 'Medium',
    tags: ['图', 'DFS', '递归', '栈'],
    hints: [
      '使用递归或显式栈实现DFS',
      '需要visited集合避免重复访问（处理环）',
      'DFS适合找路径存在性，BFS适合找最短路径',
    ],
    sampleAnswer:
      'DFS递归实现：\n\n```python\ndef has_path(graph, src, dst, visited=None):\n    if visited is None:\n        visited = set()\n    if src == dst:\n        return True\n    visited.add(src)\n    for neighbor in graph.get(src, []):\n        if neighbor not in visited:\n            if has_path(graph, neighbor, dst, visited):\n                return True\n    return False\n\n# 迭代版本（使用栈）\ndef has_path_iterative(graph, src, dst):\n    stack, visited = [src], {src}\n    while stack:\n        node = stack.pop()\n        if node == dst: return True\n        for neighbor in graph.get(node, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                stack.append(neighbor)\n    return False\n```\n\nDFS vs BFS：\n- DFS：内存占用小，适合拓扑排序、连通分量\n- BFS：适合最短路径（无权图）、层次遍历',
    relatedQuestions: ['algo-5', 'algo-10'],
    timeLimit: 600,
  },
  {
    id: 'algo-9',
    title: '堆排序',
    description:
      '请实现堆排序算法，对给定整数数组进行升序排序。要求讲解大根堆的构建过程、堆化操作，以及堆排序的时间复杂度分析。\n\n示例：\n- 输入：[4,10,3,5,1] → 输出：[1,3,4,5,10]',
    category: '算法',
    difficulty: 'Medium',
    tags: ['排序', '堆', '优先队列'],
    hints: [
      '建堆：从最后一个非叶子节点开始，自底向上进行堆化',
      '排序：将堆顶（最大值）与末尾元素交换，缩小堆范围，重新堆化',
      '父节点下标 i，左子节点 2i+1，右子节点 2i+2',
    ],
    sampleAnswer:
      '堆排序实现：\n\n```python\ndef heap_sort(arr):\n    n = len(arr)\n    # 建大根堆\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    # 逐个提取最大值\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        heapify(arr, i, 0)\n\ndef heapify(arr, n, i):\n    largest = i\n    left, right = 2*i+1, 2*i+2\n    if left < n and arr[left] > arr[largest]:\n        largest = left\n    if right < n and arr[right] > arr[largest]:\n        largest = right\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)\n```\n\n时间复杂度：建堆 O(n)，排序 O(n log n)，总体 O(n log n)。空间复杂度 O(1)（原地）。',
    relatedQuestions: ['algo-2'],
    timeLimit: 600,
  },
  {
    id: 'algo-10',
    title: '最短路径-Dijkstra算法',
    description:
      '给定带权有向图和起点，使用Dijkstra算法求从起点到所有其他顶点的最短路径。要求分析算法正确性（贪心思想）和时间复杂度，以及优先队列优化版本。',
    category: '算法',
    difficulty: 'Hard',
    tags: ['图', '最短路径', '贪心', '优先队列'],
    hints: [
      '维护dist数组记录从起点到每个节点的最短距离，初始为无穷大',
      '使用最小堆（优先队列）每次取出当前最近节点',
      '松弛操作：若 dist[u] + w(u,v) < dist[v]，更新 dist[v]',
      'Dijkstra要求边权非负，负权边需使用Bellman-Ford',
    ],
    sampleAnswer:
      'Dijkstra优先队列版本：\n\n```python\nimport heapq\n\ndef dijkstra(graph, start):\n    # graph: {node: [(weight, neighbor), ...]}\n    dist = {node: float(\'inf\') for node in graph}\n    dist[start] = 0\n    pq = [(0, start)]  # (distance, node)\n    \n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:  # 过期条目，跳过\n            continue\n        for weight, v in graph[u]:\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                heapq.heappush(pq, (dist[v], v))\n    return dist\n```\n\n时间复杂度：O((V+E) log V)，其中 V 是节点数，E 是边数。\n\n应用场景：地图导航、网络路由协议（OSPF）。',
    relatedQuestions: ['algo-8'],
    timeLimit: 900,
  },

  // ==================== 系统设计 ====================
  {
    id: 'sys-1',
    title: '设计短链接服务',
    description:
      '请设计一个类似 bit.ly 的短链接服务系统。需要支持：\n1. 将长URL转换为短URL\n2. 短URL重定向到原始URL\n3. 统计点击量\n4. 自定义短链接\n\n请从系统架构、数据库设计、API接口、扩展性等方面进行详细说明。',
    category: '系统设计',
    difficulty: 'Hard',
    tags: ['系统设计', '数据库', '缓存', '分布式'],
    hints: [
      '考虑使用Base62编码（a-z, A-Z, 0-9）生成短码',
      '数据库选型：MySQL存储映射，Redis缓存热门链接',
      '生成短码策略：Hash截取 vs 自增ID + Base62编码',
      '考虑高可用、水平扩展和数据一致性',
    ],
    sampleAnswer:
      '短链接服务设计方案：\n\n**核心组件**：\n1. Web服务器（Nginx + 多实例App Server）\n2. 数据库：MySQL（存储URL映射）+ Redis（热点缓存）\n3. ID生成器：Snowflake算法生成分布式唯一ID\n\n**短码生成**：\n- 自增ID → Base62编码（6位可表示568亿个URL）\n- 示例：ID=12345 → "dnh"\n\n**API设计**：\n- POST /api/shorten：{"long_url": "..."} → {"short_url": "bit.ly/dnh"}\n- GET /{code}：301/302重定向\n\n**数据库表**：\n```sql\nCREATE TABLE urls (\n    id BIGINT PRIMARY KEY,\n    short_code VARCHAR(10) UNIQUE,\n    long_url TEXT NOT NULL,\n    click_count BIGINT DEFAULT 0,\n    created_at DATETIME\n);\n```\n\n**性能优化**：\n- Redis缓存热门短链（LRU策略）\n- 读多写少，可用读写分离\n- CDN加速静态资源\n- 点击量异步更新（消息队列）',
    relatedQuestions: ['sys-4', 'sys-5'],
    timeLimit: 1800,
  },
  {
    id: 'sys-2',
    title: '设计聊天系统',
    description:
      '请设计一个支持百万用户的实时聊天系统，类似微信或Slack。需要支持：\n1. 一对一私聊\n2. 群组聊天（最多500人）\n3. 消息持久化和历史记录\n4. 在线状态显示\n5. 消息送达确认',
    category: '系统设计',
    difficulty: 'Hard',
    tags: ['系统设计', 'WebSocket', '消息队列', '分布式'],
    hints: [
      'WebSocket实现全双工实时通信，长轮询作为降级方案',
      '使用消息队列（Kafka）解耦消息发送和存储',
      '数据库：用户信息用MySQL，聊天记录用Cassandra（高写入）',
      '群聊消息扇出：在线用户推送，离线用户存储待推',
    ],
    sampleAnswer:
      '聊天系统架构设计：\n\n**连接层**：WebSocket服务器集群，每个节点维护用户连接映射\n\n**消息流程**：\n1. 用户A发消息 → WebSocket Server A\n2. Server A → Kafka消息队列\n3. 消息服务消费Kafka → 写入数据库 + 推送给接收方\n\n**数据库设计**：\n- MySQL：用户信息、好友关系、群组信息\n- Cassandra：聊天记录（按会话ID + 时间排序）\n- Redis：用户在线状态、会话信息缓存\n\n**群聊扇出策略**：\n- 小群（<100人）：写扩散（直接推送给每个成员的收件箱）\n- 大群（>100人）：读扩散（存一份消息，读时拉取）\n\n**消息可靠性**：\n- 客户端消息ID去重\n- ACK确认机制\n- 离线消息队列',
    relatedQuestions: ['sys-5'],
    timeLimit: 1800,
  },
  {
    id: 'sys-3',
    title: '设计搜索引擎',
    description:
      '请设计一个简化版搜索引擎的后端系统，需要支持：\n1. 网页爬取和索引建立\n2. 全文检索\n3. 搜索结果排名\n4. 搜索建议（自动补全）\n5. 处理每秒10万次查询',
    category: '系统设计',
    difficulty: 'Hard',
    tags: ['系统设计', '搜索', '倒排索引', '爬虫'],
    hints: [
      '倒排索引：词项 → 包含该词的文档列表（文档ID + 词频 + 位置）',
      '爬虫：广度优先爬取，URL去重用Bloom Filter',
      'PageRank算法用于页面重要性排名',
      '搜索建议用Trie树或Elasticsearch的completion suggester',
    ],
    sampleAnswer:
      '搜索引擎系统设计：\n\n**核心组件**：\n1. 网页爬虫（Crawler）\n2. 索引构建器（Indexer）\n3. 查询处理器（Query Processor）\n4. 排名算法（Ranker）\n\n**倒排索引结构**：\n```\n"算法" → [(doc1, tf=3, pos=[10,45,78]), (doc5, tf=1, ...)]\n"数据结构" → [(doc2, ...), ...]\n```\n\n**排名因素**：TF-IDF 相关性 + PageRank权威性 + 点击率 + 新鲜度\n\n**查询流程**：\n1. 分词（中文分词用jieba）\n2. 查倒排索引获取候选文档\n3. 计算相关性评分\n4. 排序返回TopK\n\n**自动补全**：Trie树 + 搜索频率排序，Redis缓存热门搜索词\n\n**扩展**：分布式索引（按URL hash分片），多级缓存（结果缓存30秒）',
    relatedQuestions: ['sys-4'],
    timeLimit: 1800,
  },
  {
    id: 'sys-4',
    title: '设计分布式缓存',
    description:
      '请设计一个类似Redis Cluster的分布式缓存系统，需要支持：\n1. 基本KV操作（Get/Set/Delete）\n2. 数据分片（一致性哈希）\n3. 副本与故障转移\n4. 缓存淘汰策略\n5. 缓存穿透、雪崩、击穿的应对方案',
    category: '系统设计',
    difficulty: 'Hard',
    tags: ['系统设计', '缓存', '分布式', '一致性哈希'],
    hints: [
      '一致性哈希避免扩容时大量数据迁移，添加虚拟节点解决数据倾斜',
      '主从复制保证高可用，哨兵模式自动故障转移',
      'LRU/LFU/TTL等淘汰策略，Redis使用近似LRU',
      '缓存穿透：布隆过滤器；雪崩：随机TTL；击穿：分布式锁',
    ],
    sampleAnswer:
      '分布式缓存设计：\n\n**数据分片**：一致性哈希环\n- 每个节点映射多个虚拟节点（150-300个）\n- 请求按key的hash值落到最近的虚拟节点\n- 扩容时只需迁移相邻节点的部分数据\n\n**高可用**：\n- 每个分片1主2从，主节点写，从节点读\n- Raft/ZooKeeper协调故障转移\n\n**缓存问题解决方案**：\n1. **缓存穿透**：查询不存在的key，用Bloom Filter过滤非法请求\n2. **缓存雪崩**：大量key同时过期，设置随机TTL = base_ttl + random(0, 300s)\n3. **缓存击穿**：热点key过期，用分布式锁确保只有一个请求重建缓存\n\n**淘汰策略**（按场景选择）：\n- LRU：通用场景\n- LFU：访问频率差异大的场景\n- allkeys-random：闪存缓存\n\n**监控指标**：命中率、延迟、内存使用率',
    relatedQuestions: ['sys-1'],
    timeLimit: 1800,
  },
  {
    id: 'sys-5',
    title: '设计消息队列',
    description:
      '请设计一个类似Kafka的分布式消息队列系统，需要支持：\n1. 发布/订阅模式\n2. 消息持久化\n3. 消费者组（Consumer Group）\n4. 消息有序性保证\n5. 高吞吐量（百万TPS）',
    category: '系统设计',
    difficulty: 'Hard',
    tags: ['系统设计', '消息队列', 'Kafka', '分布式'],
    hints: [
      'Topic分为多个Partition，每个Partition是有序的追加写日志',
      '每个Partition有多个副本（Replica），Leader处理读写，Follower同步',
      'Consumer Group中每个Partition只被一个Consumer消费，实现负载均衡',
      '使用顺序写磁盘 + 零拷贝技术实现高吞吐量',
    ],
    sampleAnswer:
      '消息队列系统设计（类Kafka）：\n\n**核心概念**：\n- **Topic**：消息分类\n- **Partition**：Topic的分片，保证有序性和并行消费\n- **Offset**：消息在Partition中的位置\n- **Consumer Group**：一组消费者共同消费Topic\n\n**存储设计**：\n- 每个Partition对应磁盘上的一组Segment文件\n- 每个Segment包含：数据文件(.log) + 索引文件(.index)\n- 只追加写，顺序IO，吞吐量极高\n\n**高吞吐技术**：\n1. 顺序写磁盘（比随机写快100倍）\n2. 零拷贝（sendfile系统调用）\n3. 批量压缩（lz4/snappy）\n4. 分区并行处理\n\n**副本机制**：\n- ISR（In-Sync Replicas）列表\n- Leader选举：ISR中的第一个副本\n- acks=all 保证强一致性\n\n**消费者组再平衡**：触发条件：Consumer加入/离开、Topic分区变化',
    relatedQuestions: ['sys-2'],
    timeLimit: 1800,
  },

  // ==================== 行为面试 ====================
  {
    id: 'beh-1',
    title: '自我介绍',
    description:
      '请用2-3分钟进行自我介绍。面试官希望了解你的教育背景、工作经验、技术技能和职业亮点。\n\n请注意：\n1. 突出与岗位相关的经验\n2. 用具体数据和成果说话\n3. 展现你的热情和动力\n4. 结构清晰，重点突出',
    category: '行为面试',
    difficulty: 'Easy',
    tags: ['自我介绍', '沟通', '个人展示'],
    hints: [
      '使用"过去-现在-未来"结构：过去经历、现在在做什么、为何对这个职位感兴趣',
      '用STAR法则（情境、任务、行动、结果）描述具体成就',
      '量化成果：如"提升了30%的性能"、"领导5人团队"',
      '控制时长在2-3分钟，不要太短也不要太长',
    ],
    sampleAnswer:
      '自我介绍参考框架（STAR结构）：\n\n"您好，我叫XXX，毕业于XX大学计算机专业，拥有X年的后端/全栈开发经验。\n\n在过去的工作中，我主要负责XX系统的设计与开发。举个例子，去年我主导了一个搜索服务的性能优化项目——面对系统每天处理500万次查询却时延高的问题，我通过引入Elasticsearch和Redis缓存，将平均响应时间从800ms降低到50ms，用户满意度提升了35%。\n\n目前我熟练掌握Java/Go/Python等语言，对分布式系统和微服务架构有深入理解。\n\n我申请贵公司的原因是，贵公司在XX领域的技术积累与我的发展方向高度契合，我希望能在更大的技术平台上发挥价值，也很期待向团队学习。"\n\n关键点：具体数字、清晰结构、与岗位匹配',
    relatedQuestions: ['beh-4'],
    timeLimit: 300,
  },
  {
    id: 'beh-2',
    title: '描述你面对的最大挑战',
    description:
      '请描述你在工作或学习中遇到的最大技术或团队挑战，以及你是如何克服它的？\n\n面试官评估要点：\n1. 你对困难的认知和分析能力\n2. 解决问题的方法论\n3. 抗压能力和韧性\n4. 从失败中学习的能力',
    category: '行为面试',
    difficulty: 'Medium',
    tags: ['挑战', '问题解决', 'STAR法则'],
    hints: [
      '选择一个真实的、有深度的挑战，避免选过于简单的例子',
      '使用STAR法则：Situation（背景）、Task（任务）、Action（行动）、Result（结果）',
      '强调你的个人贡献，而非团队的集体成果',
      '说明你从中学到了什么，展现成长心态',
    ],
    sampleAnswer:
      'STAR法则回答模板：\n\n**情境（S）**：在我上一份工作中，我们的核心支付系统在大促期间突然出现严重性能问题，TPS从1万降到了2000，大量订单超时失败，这直接影响到公司当天数千万的营收。\n\n**任务（T）**：我被指派为技术负责人，需要在4小时内定位并解决问题，同时保证数据完整性。\n\n**行动（A）**：\n1. 立即组织应急小组，分工排查（数据库、应用层、网络）\n2. 通过监控发现数据库连接池耗尽，追溯到某次代码上线引入了慢查询\n3. 短期：临时扩容连接池 + 回滚有问题的代码\n4. 长期：建立SQL审查机制 + 压测流程\n\n**结果（R）**：45分钟内系统恢复正常，损失控制在最小范围。事后建立了完善的性能测试pipeline，该问题再未发生。\n\n**学习**：危机处理需要系统化思维，平时的监控告警体系建设至关重要。',
    relatedQuestions: ['beh-5'],
    timeLimit: 600,
  },
  {
    id: 'beh-3',
    title: '如何处理团队冲突',
    description:
      '请举例说明你曾经遇到的团队冲突情况，以及你是如何处理的？\n\n面试官想了解：\n1. 你的团队协作能力\n2. 冲突解决策略\n3. 情绪管理和沟通技巧\n4. 是否能维护团队凝聚力',
    category: '行为面试',
    difficulty: 'Medium',
    tags: ['团队协作', '冲突解决', '沟通'],
    hints: [
      '描述一个具体的冲突案例，而非泛泛而谈',
      '展现你的倾听能力和换位思考，而不仅是坚持己见',
      '说明解决方案如何兼顾了各方利益',
      '强调最终结果对团队/项目的积极影响',
    ],
    sampleAnswer:
      '团队冲突处理案例（STAR）：\n\n**背景**：在一个微服务重构项目中，前端和后端团队在API设计上产生严重分歧。前端希望接口返回完整的嵌套对象（减少请求次数），后端坚持返回扁平数据（便于维护）。双方互不让步，影响了项目进度。\n\n**我的行动**：\n1. **倾听双方**：分别与两边深度沟通，理解各自的技术诉求和痛点\n2. **找共同目标**：把焦点拉回"用户体验好、代码可维护"这个共同目标\n3. **提出折中方案**：引入GraphQL，让前端自行声明所需字段，后端只提供resolver\n4. **数据验证**：做了一个小型POC验证方案可行性，用数据说话\n5. **建立规范**：推动制定了API设计规范文档，避免类似冲突再发生\n\n**结果**：方案获得双方认可，项目按时交付。这次经历让我意识到，很多技术争论的根源是信息不对称，结构化沟通和数据驱动决策是解决冲突的关键。',
    relatedQuestions: ['beh-1'],
    timeLimit: 600,
  },
  {
    id: 'beh-4',
    title: '你的职业规划',
    description:
      '请描述你未来3-5年的职业发展规划，以及你为何选择加入我们公司？\n\n面试官希望了解：\n1. 你的职业发展目标是否清晰\n2. 你的规划与岗位/公司是否匹配\n3. 你的内驱力和主动性\n4. 你对这个行业的理解',
    category: '行为面试',
    difficulty: 'Easy',
    tags: ['职业规划', '目标设定', '自我认知'],
    hints: [
      '规划要具体，分短期（1-2年）和长期（3-5年）',
      '将个人目标与公司发展方向结合，展现双赢',
      '提及你将如何提升自己来达成目标（学习计划）',
      '避免只谈钱或职位晋升，多谈能力提升和价值创造',
    ],
    sampleAnswer:
      '职业规划回答框架：\n\n**短期目标（1-2年）**：\n在技术深度上，我计划深入掌握云原生架构（Kubernetes、Service Mesh），并考取相关认证。在当前岗位上，我希望能主导至少一个核心系统的设计或重构，从执行者成长为技术方案的贡献者。\n\n**中期目标（3-5年）**：\n成为一名技术专家或带小团队的技术Lead。我希望不仅能写出高质量代码，还能在系统设计、技术选型和团队mentoring上发挥价值。\n\n**为何选择贵公司**：\n贵公司在XX领域（如大数据/AI/金融科技）处于行业前沿，技术栈现代，工程文化开放。我认为这里能提供真实的大规模系统挑战，帮助我快速成长。同时，公司的XX产品/业务方向与我的技术兴趣高度契合。\n\n**核心逻辑**：将个人成长路径与公司业务发展结合，展现你对这份工作是经过深思熟虑的选择，而非随意投递。',
    relatedQuestions: ['beh-1'],
    timeLimit: 300,
  },
  {
    id: 'beh-5',
    title: '项目失败经历',
    description:
      '请描述一次你参与的失败项目或你犯过的一个重大错误，以及你从中学到了什么？\n\n注意：面试官并非想找你的把柄，而是考察：\n1. 你的自我反思能力\n2. 诚实和勇于承担责任的态度\n3. 从失败中学习和改进的能力',
    category: '行为面试',
    difficulty: 'Medium',
    tags: ['失败经历', '自我反思', '成长'],
    hints: [
      '选一个真实的失败案例，但不要选严重到影响职业声誉的',
      '客观分析失败原因，不要完全归咎于外部因素',
      '重点放在你从中学到了什么，以及之后如何改进',
      '展示失败后的行动和改变，而非仅停留在反思',
    ],
    sampleAnswer:
      '失败经历回答模板：\n\n**事件描述**：\n两年前，我在没有充分评估风险的情况下，推动团队采用了一个当时相对较新的技术框架进行核心模块重构。我被新框架的特性吸引，低估了学习曲线和生态成熟度的问题。\n\n**后果**：\n项目延期了6周，最终部分功能不得不回退到旧方案，团队士气也受到了影响。\n\n**根本原因分析**：\n1. 技术选型时过于"技术驱动"，没有充分考虑团队现有能力和项目风险\n2. 缺乏POC阶段，直接在生产代码中实践\n3. 没有设计回退方案（Plan B）\n\n**改进措施**：\n- 建立了技术选型评审模板（包含：成熟度、社区支持、团队能力、迁移成本等维度）\n- 任何引入新技术必须先做2周的POC\n- 项目计划中必须包含风险评估和应急预案\n\n**总结**：这次经历让我认识到，工程决策需要在创新欲望和风险控制之间找到平衡。谨慎不是保守，而是对团队负责。',
    relatedQuestions: ['beh-2'],
    timeLimit: 600,
  },

  // ==================== 数据库 ====================
  {
    id: 'db-1',
    title: 'SQL JOIN的类型与区别',
    description:
      '请详细说明SQL中各种JOIN类型（INNER JOIN、LEFT JOIN、RIGHT JOIN、FULL OUTER JOIN、CROSS JOIN）的区别，并举例说明各自的使用场景。',
    category: '数据库',
    difficulty: 'Medium',
    tags: ['SQL', 'JOIN', '关系型数据库'],
    hints: [
      'INNER JOIN只返回两表都匹配的行',
      'LEFT JOIN返回左表所有行，右表无匹配则为NULL',
      'RIGHT JOIN返回右表所有行，左表无匹配则为NULL',
      'FULL OUTER JOIN返回两表所有行（MySQL不直接支持，需用UNION模拟）',
    ],
    sampleAnswer:
      'SQL JOIN类型详解：\n\n```sql\n-- 示例表：employees(id, name, dept_id) 和 departments(id, name)\n\n-- INNER JOIN：只返回两表都有的数据\nSELECT e.name, d.name FROM employees e\nINNER JOIN departments d ON e.dept_id = d.id;\n-- 不会返回没有部门的员工，也不会返回没有员工的部门\n\n-- LEFT JOIN：返回左表全部 + 右表匹配（常用！）\nSELECT e.name, d.name FROM employees e\nLEFT JOIN departments d ON e.dept_id = d.id;\n-- 返回所有员工，没有部门的员工dept.name为NULL\n\n-- RIGHT JOIN：与LEFT JOIN相反（建议改写为LEFT JOIN）\n\n-- FULL OUTER JOIN（MySQL用UNION模拟）\nSELECT e.name, d.name FROM employees e\nLEFT JOIN departments d ON e.dept_id = d.id\nUNION\nSELECT e.name, d.name FROM employees e\nRIGHT JOIN departments d ON e.dept_id = d.id;\n\n-- CROSS JOIN：笛卡尔积，谨慎使用\nSELECT * FROM employees CROSS JOIN departments;\n```\n\n使用建议：90%场景用LEFT JOIN，避免CROSS JOIN（指数级增长）。',
    relatedQuestions: ['db-2', 'db-3'],
    timeLimit: 600,
  },
  {
    id: 'db-2',
    title: '数据库索引原理',
    description:
      '请解释数据库索引的底层原理（B+Tree），以及何时应该创建索引、何时不应该创建索引。同时说明联合索引的最左前缀原则。',
    category: '数据库',
    difficulty: 'Medium',
    tags: ['索引', 'B+Tree', 'MySQL', '性能优化'],
    hints: [
      'B+Tree：所有数据存在叶子节点，叶子节点形成有序链表，查询效率稳定O(log n)',
      'InnoDB主键索引（聚簇索引）数据直接存在索引中，二级索引存主键值',
      '联合索引遵循最左前缀原则：(a,b,c)索引可用于查询a、(a,b)，但不能直接用于查询b或c',
      '索引的代价：写操作需维护索引，占用额外磁盘空间',
    ],
    sampleAnswer:
      '数据库索引深度解析：\n\n**B+Tree结构**：\n- 非叶子节点：只存索引键，不存数据\n- 叶子节点：存储完整数据（聚簇索引）或主键值（二级索引）\n- 叶子节点通过指针相连，支持高效范围查询\n- 树高通常为3-4层，每次查询只需3-4次磁盘IO\n\n**何时创建索引**：\n✅ WHERE、JOIN ON、ORDER BY中频繁使用的列\n✅ 高选择性（区分度高）的列，如用户ID\n✅ 范围查询的起始列\n\n**何时不应创建索引**：\n❌ 数据量小的表（全表扫描反而更快）\n❌ 低选择性列（如性别、状态，只有几个值）\n❌ 频繁更新的列（维护索引代价大）\n\n**联合索引最左前缀**：\n```sql\n-- 索引：INDEX(name, age, city)\nSELECT * FROM users WHERE name = \'Alice\';  -- ✅ 命中\nSELECT * FROM users WHERE name = \'Alice\' AND age = 25;  -- ✅ 命中\nSELECT * FROM users WHERE age = 25;  -- ❌ 未命中（没有name）\nSELECT * FROM users WHERE name = \'Alice\' AND city = \'BJ\';  -- ⚠️ 只用name部分\n```',
    relatedQuestions: ['db-1', 'db-3'],
    timeLimit: 600,
  },
  {
    id: 'db-3',
    title: '事务ACID特性',
    description:
      '请详细解释数据库事务的ACID特性（原子性、一致性、隔离性、持久性），以及MySQL InnoDB如何通过undo log、redo log和锁机制来实现这些特性。',
    category: '数据库',
    difficulty: 'Medium',
    tags: ['事务', 'ACID', 'MySQL', 'InnoDB'],
    hints: [
      '原子性（Atomicity）：undo log 支持事务回滚',
      '持久性（Durability）：redo log 实现崩溃恢复（WAL预写日志）',
      '隔离性（Isolation）：MVCC + 锁机制实现不同隔离级别',
      '一致性（Consistency）：由其他三个特性共同保证',
    ],
    sampleAnswer:
      'ACID特性与实现机制：\n\n**原子性（A）**：事务要么全部成功，要么全部回滚\n- 实现：undo log 记录操作前的数据，事务失败时读取undo log回滚\n\n**一致性（C）**：事务前后数据库保持完整性约束\n- 实现：由A、I、D共同保证，以及应用层约束（外键、check约束）\n\n**隔离性（I）**：并发事务互不干扰\n- 4个隔离级别（由弱到强）：\n  - READ UNCOMMITTED：可读取未提交数据（脏读）\n  - READ COMMITTED：只读已提交数据（可不可重复读）\n  - REPEATABLE READ（MySQL默认）：MVCC + Next-Key Lock防止幻读\n  - SERIALIZABLE：完全串行化\n- 实现：MVCC（多版本并发控制）+ 行锁/间隙锁/表锁\n\n**持久性（D）**：事务提交后永久保存\n- 实现：redo log（WAL预写日志）\n  - 事务提交前先写redo log（顺序IO，快）\n  - 崩溃恢复时重放redo log\n\n**binlog vs redo log**：binlog是MySQL server层逻辑日志用于主从复制，redo log是InnoDB引擎物理日志用于崩溃恢复。两阶段提交保证一致性。',
    relatedQuestions: ['db-2', 'db-4'],
    timeLimit: 600,
  },
  {
    id: 'db-4',
    title: '数据库范式',
    description:
      '请解释数据库设计的三种范式（1NF、2NF、3NF）以及BCNF，并说明反范式设计的适用场景。提供一个从非范式到第三范式的规范化示例。',
    category: '数据库',
    difficulty: 'Medium',
    tags: ['数据库设计', '范式', '规范化'],
    hints: [
      '1NF：每个字段不可再分（原子性）',
      '2NF：在1NF基础上，非主属性完全依赖于主键（消除部分依赖）',
      '3NF：在2NF基础上，消除非主属性对主键的传递依赖',
      '反范式：适当冗余换取查询性能，常用于读多写少的场景',
    ],
    sampleAnswer:
      '数据库范式详解与示例：\n\n**非规范化表**（问题示例）：\n```\n订单表：order_id, customer_id, customer_name, customer_email, \n        product_id, product_name, product_price, quantity\n```\n\n**1NF规范化**：确保每个字段是原子值，不存储多值\n\n**2NF规范化**（消除部分函数依赖）：\n将product信息拆出（product_id → product_name, product_price 是部分依赖）\n```\n订单表：order_id(PK), customer_id, product_id(FK), quantity\n产品表：product_id(PK), product_name, product_price\n```\n\n**3NF规范化**（消除传递依赖）：\ncustomer_id → customer_name, customer_email 存在传递依赖\n```\n订单表：order_id(PK), customer_id(FK), product_id(FK), quantity\n客户表：customer_id(PK), customer_name, customer_email\n```\n\n**反范式设计场景**：\n- 报表查询：冗余存储计算结果避免复杂JOIN\n- 历史快照：订单表冗余存product_price防止价格变动影响历史记录\n- 高并发读：冗余减少JOIN，用最终一致性替代强一致性\n\n原则：OLTP系统追求范式，OLAP/报表系统可适当反范式。',
    relatedQuestions: ['db-1', 'db-2'],
    timeLimit: 600,
  },

  // ==================== 网络 ====================
  {
    id: 'net-1',
    title: 'TCP三次握手与四次挥手',
    description:
      '请详细解释TCP连接建立的三次握手过程和连接断开的四次挥手过程，说明为什么握手是三次而不是两次，以及TIME_WAIT状态的作用。',
    category: '网络',
    difficulty: 'Medium',
    tags: ['TCP', '网络协议', '三次握手'],
    hints: [
      '三次握手：SYN → SYN-ACK → ACK，确保双方发送和接收能力都正常',
      '两次握手不够：服务端无法确认客户端能收到消息',
      '四次挥手：FIN → ACK → FIN → ACK，因为TCP是全双工，需要双方各自关闭',
      'TIME_WAIT：等待2MSL，确保最后一个ACK到达，防止旧连接的延迟数据被新连接接收',
    ],
    sampleAnswer:
      'TCP连接管理详解：\n\n**三次握手**：\n```\n客户端                服务端\n  │──── SYN(seq=x) ────▶│  第1次：客户端发起连接\n  │◀── SYN+ACK(seq=y, ack=x+1) ──│  第2次：服务端确认\n  │──── ACK(ack=y+1) ──▶│  第3次：客户端确认\n```\n\n**为什么是三次**：\n- 1次：服务端无法确认自己的发送能力\n- 2次：客户端无法确认服务端的接收能力（历史重复SYN问题）\n- 3次：最少且必要，确保双工通道双向可用\n\n**四次挥手**：\n```\n主动方               被动方\n  │──── FIN ────▶│  主动方完成发送\n  │◀──── ACK ────│  被动方确认（但可能还有数据要发）\n  │◀──── FIN ────│  被动方也完成发送\n  │──── ACK ────▶│  主动方确认，进入TIME_WAIT\n```\n\n**TIME_WAIT（2MSL）**：\n1. 确保最后一个ACK能到达被动方（丢包重传留余量）\n2. 让网络中旧连接的延迟数据包自然消亡，避免影响新连接\n\n常见问题：大量TIME_WAIT导致端口耗尽 → 开启 tcp_tw_reuse/tcp_tw_recycle',
    relatedQuestions: ['net-2', 'net-3'],
    timeLimit: 600,
  },
  {
    id: 'net-2',
    title: 'HTTP与HTTPS的区别',
    description:
      'HTTP和HTTPS有什么区别？请说明HTTPS的TLS握手过程，以及对称加密和非对称加密在HTTPS中如何配合使用。',
    category: '网络',
    difficulty: 'Easy',
    tags: ['HTTP', 'HTTPS', 'TLS', '加密'],
    hints: [
      'HTTPS = HTTP + TLS/SSL，默认端口443',
      'TLS握手用非对称加密协商会话密钥，之后用对称加密传输数据',
      '证书由CA（证书颁发机构）签名，用于验证服务器身份',
      '非对称加密（RSA/ECDSA）慢但安全，对称加密（AES）快',
    ],
    sampleAnswer:
      'HTTP vs HTTPS 核心区别：\n\n| 特性 | HTTP | HTTPS |\n|------|------|-------|\n| 默认端口 | 80 | 443 |\n| 安全性 | 明文传输 | 加密传输 |\n| 证书 | 不需要 | 需要SSL证书 |\n| 性能 | 稍快 | TLS握手有开销 |\n\n**TLS握手过程（TLS 1.2简化版）**：\n```\n客户端                          服务端\n  │── ClientHello（支持的加密套件）──▶│\n  │◀── ServerHello（选定套件）+证书 ──│\n  │── 验证证书（CA公钥验签）          │\n  │── 生成PreMasterSecret ──────────▶│\n  │   （用服务端公钥加密）             │\n  │           服务端用私钥解密         │\n  │   双方用相同算法生成会话密钥        │\n  │──────── 后续用AES对称加密 ─────── │\n```\n\n**为什么要两种加密**：\n- 非对称加密（RSA/ECDHE）：解决密钥安全交换问题，但很慢\n- 对称加密（AES-256-GCM）：实际传输数据，快且安全\n- TLS 1.3优化：减少握手往返次数，支持0-RTT',
    relatedQuestions: ['net-1', 'net-3'],
    timeLimit: 300,
  },
  {
    id: 'net-3',
    title: 'REST API设计原则',
    description:
      '请说明RESTful API的核心设计原则，包括资源命名规范、HTTP动词使用、状态码含义、版本控制策略，以及REST与GraphQL、gRPC的比较。',
    category: '网络',
    difficulty: 'Medium',
    tags: ['REST', 'API设计', 'HTTP', 'Web服务'],
    hints: [
      'REST的6个约束：无状态、统一接口、客户端-服务器分离、可缓存、分层系统、按需代码',
      'HTTP动词：GET（查）、POST（增）、PUT（整体更新）、PATCH（部分更新）、DELETE（删）',
      '资源用名词复数：/users、/articles，而不是/getUsers、/createArticle',
      'HTTP状态码：2xx成功、3xx重定向、4xx客户端错误、5xx服务器错误',
    ],
    sampleAnswer:
      'RESTful API设计最佳实践：\n\n**URL设计**：\n```\n# ✅ 正确\nGET    /api/v1/users          # 获取用户列表\nGET    /api/v1/users/{id}     # 获取单个用户\nPOST   /api/v1/users          # 创建用户\nPUT    /api/v1/users/{id}     # 全量更新\nPATCH  /api/v1/users/{id}     # 部分更新\nDELETE /api/v1/users/{id}     # 删除用户\n\n# 嵌套资源\nGET    /api/v1/users/{id}/orders  # 用户的订单\n\n# ❌ 错误\nGET    /api/v1/getUsers\nPOST   /api/v1/deleteUser/{id}\n```\n\n**状态码规范**：\n- 200 OK、201 Created、204 No Content\n- 400 Bad Request（参数错误）、401 Unauthorized、403 Forbidden、404 Not Found\n- 429 Too Many Requests（限流）\n- 500 Internal Server Error\n\n**版本控制**：URL版本 /v1/ 或 Header: Accept: application/vnd.api+json;version=1\n\n**REST vs GraphQL vs gRPC**：\n- REST：简单通用，适合公开API\n- GraphQL：前端灵活查询，适合BFF层\n- gRPC：高性能内部服务通信，基于Protobuf',
    relatedQuestions: ['net-2', 'sys-1'],
    timeLimit: 600,
  },
  {
    id: 'net-4',
    title: 'CDN工作原理',
    description:
      '请解释CDN（内容分发网络）的工作原理，包括DNS解析流程、缓存策略、回源机制，以及如何用CDN优化Web应用性能。同时说明CDN的局限性。',
    category: '网络',
    difficulty: 'Medium',
    tags: ['CDN', '缓存', 'DNS', '性能优化'],
    hints: [
      'CDN通过将内容缓存到离用户最近的边缘节点来减少延迟',
      'DNS解析：用户请求 → 本地DNS → CDN的CNAME → CDN调度系统 → 最近边缘节点IP',
      '缓存控制：Cache-Control、Expires头控制缓存时间',
      '回源：缓存未命中时，边缘节点向源站请求数据',
    ],
    sampleAnswer:
      'CDN工作原理详解：\n\n**请求流程**：\n```\n用户浏览器\n  ↓ 1. DNS查询 www.example.com\n本地DNS服务器\n  ↓ 2. CNAME解析到 www.example.cdn.com\nCDN智能调度系统\n  ↓ 3. 根据用户IP选择最近边缘节点\n北京边缘节点（缓存命中 → 直接返回）\n  ↓ 4. 缓存未命中 → 回源\n源站服务器\n```\n\n**缓存策略**：\n```\n# 静态资源（JS/CSS/图片）：长期缓存\nCache-Control: max-age=31536000, immutable\n\n# HTML文件：短期或不缓存\nCache-Control: no-cache\n\n# API响应：通常不CDN缓存\nCache-Control: no-store\n```\n\n**CDN最佳实践**：\n- 静态资源加内容哈希（bundle.a1b2c3.js），支持长期缓存\n- 图片压缩、WebP格式转换\n- HTTP/2多路复用减少连接数\n\n**CDN局限性**：\n- 动态内容效果有限（需要实时生成）\n- 缓存一致性问题（内容更新后需要缓存失效/Purge）\n- 国内CDN需ICP备案，跨境访问可能有限制',
    relatedQuestions: ['net-2', 'sys-1'],
    timeLimit: 600,
  },

  // ==================== 操作系统 ====================
  {
    id: 'os-1',
    title: '进程与线程的区别',
    description:
      '请详细说明进程和线程的区别，包括资源占用、切换开销、通信方式等。同时解释协程与线程的区别，以及多线程编程中常见的并发问题（竞态条件、死锁）。',
    category: '操作系统',
    difficulty: 'Easy',
    tags: ['进程', '线程', '并发', '操作系统'],
    hints: [
      '进程是资源分配的基本单位，线程是CPU调度的基本单位',
      '同一进程内的线程共享地址空间、文件描述符等，但有各自的栈和寄存器',
      '进程切换需要切换页表（重量级），线程切换只需切换栈和寄存器（轻量级）',
      '协程是用户态的"轻量线程"，切换开销极小，由程序自己调度',
    ],
    sampleAnswer:
      '进程 vs 线程 vs 协程：\n\n**进程**：\n- 独立地址空间、独立文件描述符\n- 进程间通信（IPC）：管道、共享内存、Socket、消息队列\n- 崩溃不影响其他进程（隔离性好）\n- 切换代价高（需换页表、刷TLB）\n\n**线程**：\n- 共享进程地址空间（代码段、数据段、堆）\n- 各有独立的栈、寄存器、线程局部存储（TLS）\n- 通信简单（共享内存），但需加锁\n- 切换代价较低（无需换页表）\n- 一个线程崩溃可能导致整个进程崩溃\n\n**协程**：\n- 用户态调度，无内核上下文切换\n- 单线程内并发（适合IO密集型）\n- Go的goroutine、Python的asyncio、Kotlin的coroutine\n\n**常见并发问题**：\n```python\n# 竞态条件示例（需加锁）\ncount = 0  # 多线程同时 count += 1 会导致结果不确定\n\n# 死锁示例（避免循环等待）\n# 线程A持有lock1，等lock2\n# 线程B持有lock2，等lock1\n```\n\n死锁预防：资源排序（固定加锁顺序）、超时机制、锁层次设计。',
    relatedQuestions: ['os-2', 'os-4'],
    timeLimit: 300,
  },
  {
    id: 'os-2',
    title: '死锁的产生条件与预防',
    description:
      '请说明死锁产生的四个必要条件（Coffman条件），并分别说明如何通过破坏各条件来预防死锁。同时介绍银行家算法和死锁检测与恢复机制。',
    category: '操作系统',
    difficulty: 'Medium',
    tags: ['死锁', '并发', '操作系统', '银行家算法'],
    hints: [
      '四个必要条件：互斥、持有并等待、不可抢占、循环等待',
      '破坏互斥：使资源可共享（只适用于可共享资源）',
      '破坏持有并等待：一次性申请所有资源，或申请前释放已持有资源',
      '破坏循环等待：对资源编号，按顺序申请',
    ],
    sampleAnswer:
      '死锁四个必要条件及预防策略：\n\n**Coffman四条件**：\n1. **互斥**：资源一次只能被一个进程使用\n2. **持有并等待**：进程持有资源的同时等待其他资源\n3. **不可抢占**：已分配给进程的资源不能被强制剥夺\n4. **循环等待**：存在 P1→P2→...→Pn→P1 的等待环\n\n**预防策略**（破坏条件）：\n1. 破坏互斥：让资源可共享（只读文件），但有些资源天然互斥（打印机）\n2. 破坏持有并等待：\n   - 一次性申请所有资源（资源利用率低）\n   - 申请新资源前释放所有已持有资源\n3. 破坏不可抢占：允许抢占（适用于CPU、内存等可恢复状态的资源）\n4. 破坏循环等待：**对资源全局排序**，按编号从小到大申请（最实用）\n\n**银行家算法**（死锁避免）：\n在分配资源前，模拟分配后的系统状态是否安全（存在安全序列）。开销较大，实际系统少用。\n\n**死锁检测与恢复**：\n- 定期运行死锁检测算法（资源分配图）\n- 恢复：终止死锁进程 或 抢占资源（回滚到检查点）\n\n**实际最佳实践**：固定加锁顺序 + lock timeout + 死锁日志监控',
    relatedQuestions: ['os-1', 'os-4'],
    timeLimit: 600,
  },
  {
    id: 'os-3',
    title: '内存分页机制',
    description:
      '请解释操作系统的内存分页（Paging）机制，包括逻辑地址到物理地址的转换过程、TLB的作用、多级页表设计，以及内存分页相比内存分段的优势。',
    category: '操作系统',
    difficulty: 'Hard',
    tags: ['内存管理', '分页', 'TLB', '虚拟内存'],
    hints: [
      '分页将物理内存分成固定大小的帧（Frame），逻辑地址空间分成相同大小的页（Page）',
      '逻辑地址 = 页号(VPN) + 页内偏移，通过页表查物理帧号，再加偏移得到物理地址',
      'TLB（Translation Lookaside Buffer）是页表的硬件缓存，命中则无需访问内存中的页表',
      '64位系统通常使用4级页表，按需分配节省内存',
    ],
    sampleAnswer:
      '内存分页机制深度解析：\n\n**地址转换**：\n```\n逻辑地址（48位）= VPN(36位) + 页内偏移(12位，即4KB页)\n                   ↓ 查页表\n物理地址 = 物理帧号(PPN) + 页内偏移\n```\n\n**4级页表结构（x86-64）**：\n```\nCR3寄存器 → PML4 → PDPT → PD → PT → 物理帧\n（每级占9位VPN）\n```\n\n**TLB工作原理**：\n- TLB是小而快的硬件缓存，存储最近使用的VPN→PPN映射\n- TLB命中：1个时钟周期内完成地址转换\n- TLB未命中：需多次访问内存中的页表（4级 = 4次内存访问）\n- 上下文切换：TLB需刷新（或使用ASID标记避免刷新）\n\n**分页 vs 分段**：\n| | 分页 | 分段 |\n|--|--|--|\n| 大小 | 固定（4KB） | 可变 |\n| 外部碎片 | 无 | 有 |\n| 内部碎片 | 有（小） | 无 |\n| 实现 | 简单 | 复杂 |\n\n**缺页异常**：访问未映射或未加载的页 → 内核处理（分配物理帧/从磁盘读入）→ 返回用户态重试',
    relatedQuestions: ['os-1', 'os-4'],
    timeLimit: 900,
  },
  {
    id: 'os-4',
    title: '进程调度算法',
    description:
      '请介绍常见的进程调度算法（FCFS、SJF、优先级调度、Round Robin、多级反馈队列），分析各自的优缺点，以及Linux的完全公平调度器（CFS）的工作原理。',
    category: '操作系统',
    difficulty: 'Medium',
    tags: ['进程调度', '操作系统', 'CFS', '算法'],
    hints: [
      'FCFS（先来先服务）：简单但可能导致长作业让短作业等待（护航效应）',
      'SJF（最短作业优先）：平均等待时间最优，但需要预知执行时间',
      'Round Robin：每个进程执行一个时间片，公平但上下文切换开销大',
      'CFS使用红黑树按虚拟运行时间排序，保证每个进程公平获得CPU',
    ],
    sampleAnswer:
      '进程调度算法比较：\n\n**非抢占式**：\n- **FCFS**：按到达顺序执行。优点：简单；缺点：护航效应（长任务阻塞短任务）\n- **SJF**：选执行时间最短的任务。优点：平均等待时间最优；缺点：长任务可能饥饿\n\n**抢占式**：\n- **SRTF**（最短剩余时间优先）：SJF的抢占版本\n- **Round Robin（RR）**：时间片轮转（典型10-100ms）。优点：响应快，公平；缺点：上下文切换开销，时间片大小影响性能\n- **优先级调度**：高优先级优先，低优先级可能饥饿（老化算法解决）\n\n**多级反馈队列（MLFQ）**：\n- 多个优先级队列，新进程从高优先级开始\n- 用完时间片降级，IO后升级\n- 集合了SJF和RR的优点\n\n**Linux CFS（完全公平调度器）**：\n```\n每个任务维护 vruntime（虚拟运行时间 = 实际运行时间 × nice权重）\n红黑树按vruntime排序，每次选最小vruntime的任务运行\n保证每个任务"公平"获得CPU时间，同时支持优先级（nice值）\n```\n\n延迟（调度周期）= max(调度延迟, 任务数 × 最小粒度)',
    relatedQuestions: ['os-1', 'os-2'],
    timeLimit: 600,
  },
];

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getQuestionsByCategory(category: string): Question[] {
  return questions.filter((q) => q.category === category);
}

export function getRandomQuestions(count: number, category?: string): Question[] {
  const pool = category ? getQuestionsByCategory(category) : questions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
