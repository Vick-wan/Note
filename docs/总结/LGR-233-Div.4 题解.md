**题解简化了题意，表达依旧清晰准确。**
## Problem A: 季风
### 题目描述

给定两个非零数 $A$ 和 $B$，表示方向。
- 如果 $A > 0$ 那么风朝北刮，$A < 0$ 风朝南刮。
- 如果 $B > 0$ 那么风朝东刮，$B < 0$ 风朝西刮。

求最后的方向，先输出风朝北 `(North)` 或南 `(South)` 吹，然后输出风朝东 `(East)` 或西 `(West)`。

## 数据范围
$1 \le |a|, |b| \le 20$

### 思路
直接判断，然后顺序输出就好。

### Code
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    if (a > 0) cout << "North";
    else cout << "South";
    
    if (b > 0) cout << "East";
    else cout << "West";

	cout << "\n";
	
    return 0;
}
```

---
## Problem B: 购票
### 题目描述
公园有两种票，$a$ 元的单次票和 $b$ 元的永久票。总共要去 $n$ 次公园，问最少花多少钱。

### 数据范围
$0 \le a, b, n \le 10^{18}$

### 思路
两种方案，都用单词票和都用年票，价格分别为 $n \times a$ 和 $b$ 。输出最小的即可。**注意，观察数据范围可以发现这题需要开 `unsigned long long`。**

### Code
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, a, b;
    cin >> n >> a >> b;

	cout << min(a * n, b) << "\n";
}
```

---
## Problem C: 百万富翁
### 题目描述
有 $n$ 个抽奖机， 每个机器花费 $a_i$ 的积分而可以获得 $b_i$ 的积分， 初始你有 $x$ 个积分，目标达到 $y$ 积分。以输入顺序依次遍历每个抽奖机。一旦出现下面任意一种情况时，就不会再玩后面的抽奖机了。

- 当前积分 $x$ 大于或等于目标积分 $y$，即 $x \ge y$ 。
- 当前积分不够玩当前抽奖机，即 $x \le a_i$ 。
- 所有抽奖机都玩完了。

游玩停止后，他拥有的等级分的数量。

### 数据范围
$1 \le n \le 10^{5}$ ， $1 \le x < y \le 10^{9}$， $1 \le a_{i}, b_{i} \le 10^9$ 

### 思路
这一题我们按照题目模拟即可，注意如果没有停止游玩，那么抽奖机必须玩，不能不玩。

### Code
```cpp
#include <bits/stdc++.h>
using namespace std;

int n, x, y;

int main() {
    cin >> n >> x >> y;
    for (int i = 1; i <= n; i++) {
        int a, b;
        cin >> a >> b;

        if (x >= y) break;
        if (x < a) break;

        x += b - a;
    }

    cout << x << "\n";

    return 0;
}
```

---
## Problem D: 卡牌游戏
### 题目描述
有 $n$ 张牌，编号为 $a_1, a_2, \cdots, a_n$，从顶到底排列。

给定一个参数 $k$，按如下步骤洗牌一次：

1. 把前 $k$ 张牌分成牌堆 $A$，剩下的分成牌堆 $B$。
2. 从牌堆 $A$ 开始，轮流从 $A$、$B$ 的顶部各取一张牌，依次放到新牌堆底部，直到某一堆没牌。
3. 把剩下那堆的所有牌，按原顺序放到新牌堆底部。

请输出洗一次牌后的牌堆顺序。

### 数据范围
$1 \le n \le 2000$ ， $1 \le k \le n$
### 思路
我们找题模拟即可，这里可以使用了 `vector` 方便模拟。

### Code
```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> v;
int a[2000 + 5];

int main() {
    int n, k;
    cin >> n >> k;

    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }

    int l = 1, r = k + 1;
    while (l <= k && r <= n) {
        v.push_back(a[l]);
        v.push_back(a[r]);
        l++, r++;
    }

    while (l <= k) v.push_back(a[l++]);
    while (r <= n) v.push_back(a[r++]);

    for (auto u : v) cout << u << " ";
    
    return 0;
}
```

---
## Problem E: 地铁计费
### 题目描述
S 市地铁一号线有 $n$ 个车站，编号 $1$ 到 $n$，这些车站被分成若干**连续的收费区**。

- 收费区由 $k+1$ 个分界点 $p_0, p_1, ..., p_k$ 给定（$p_0=1<p_1<\cdots<p_k=n+1$），第 $i$ 个收费区是 $[p_{i-1}, p_i-1]$。
- 每个收费区覆盖一段连续的车站，所有收费区首尾相接、无重叠、无遗漏。

地铁车费规则如下：
1. **同一车站进出**：费用为 $1$ 元。
2. **同一收费区内不同车站**：费用为 $2$ 元。
3. **不同收费区**：若乘车区间 $[a, b]$（$a<b$）内，收费区 $[l_x, r_x]$ 完全落在 $[a, b]$，这样的收费区有 $m$ 个，则费用为 $2 + m$ 元。

给定 $q$ 次询问，每次给出两个车站编号 $i, j$，问从 $i$ 到 $j$ 的费用是多少。

### 数据范围
$1 \le k \le 1000$ ， $1 \le n \le 10^9$ ， $k \le n$， $1 \le q \le 10^5$

### 思路
观察数据范围发现这题暴力会超时，所以查询时，考虑使用二分算出 $i$ 和 $j$ 可以包含的最多收费区的数量。注意：**$i$ 可能大于 $j$， 所以需要判断。**

### Code
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 5;

int n, k;
int a[MAXN];

int main() {
    cin >> n >> k;
    for (int i = 1; i <= k + 1; i++) {
        cin >> a[i];
    }

    int Q;
    cin >> Q;

    while (Q--) {
        int u, v;
        cin >> u >> v;

        if (u > v) swap(u, v);
        if (u == v) {
            cout << "1\n";
            continue;
        }

        int lans = 0, rans = 0; // i 和 j 分别往左和右可以到达的最远的收费区
        int l = 1, r = k;
        while (l <= r) {
            int mid = (l + r) >> 1;
            if (u < a[mid + 1]) {
                lans = mid;
                r = mid - 1;
            } else l = mid + 1;
        }

        l = 1, r = k;
        while (l <= r) {
            int mid = (l + r) >> 1;
            if (v >= a[mid]) {
                rans = mid;
                l = mid + 1;
            } else r = mid - 1;
        }

        int ansl = lans, ansr = rans; // i 和 j 可以包含的收费区
        if (u > a[lans]) ansl++;
        if (v < a[rans + 1] - 1) ansr--;

        if (lans == rans) cout << "2\n";
        else if (ansl == ansr) cout << "3\n";
        else cout << 2 + (ansr - ansl + 1) << "\n";
    }

    return 0;
}
```

---
## Problem F: 代数瓜子式
### 题目描述
简化题意如下：

---

给你一个 $n \times n$ 的矩阵 $A$，每次询问给定要删除 $k$ 行和 $k$ 列。  
删除后，剩下的 $(n-k) \times (n-k)$ 子矩阵记为 $B$，被删的行和被删的列交叉处形成 $k \times k$ 方阵 $C$。

定义，对于一个 $m \times m$ 矩阵 $X$，有：
$$
f(X) = \prod_{i=1}^{m} X_{i,i} - \prod_{i=1}^{m} X_{i, m-i+1}
$$
即**主对角线元素连乘之和减去副对角线元素连乘之和**。

每次询问，输出 $f(B) \times f(C) \bmod 10^9+7$。
### 数据范围
$1 \le k < n \le 600$， $1 \le 600$， $0 \le A_{i, j} < 10^5$

### 思路
分析题意可以轻松得到以下信息：
1. 如果这个点的既不被任何要删除的行包括，又不被任何的要删除的列包括，那么这个点属于 $B$ 矩阵。
2. 如果这个点既被某一个要删除的行包括，又被某一个要删除的列包括，那么这个点属于 $C$ 矩阵。

所以我们可以算出两个矩阵，然后计算答案。

### Code
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int MAXN = 600 + 5;
const int MOD = (int)1e9 + 7;

ll a[MAXN][MAXN];
ll row[MAXN], col[MAXN];
vector<vector<ll>> B, C;

int main() {
    int n, Q;
    cin >> n >> Q;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> a[i][j];
        }
    }

    while (Q--) {
        int k;
        cin >> k;

        B.clear();
        C.clear();

        for (int i = 1; i <= n; i++) row[i] = col[i] = 0;

        for (int i = 1; i <= k; i++) {
            int tmp;
            cin >> tmp;

            row[tmp] = 1;
        }
        for (int i = 1; i <= k; i++) {
            int tmp;
            cin >> tmp;

            col[tmp] = 1;
        }

        for (int i = 1; i <= n; i++) {
            vector<ll> b, c;
            for (int j = 1; j <= n; j++) {
                if (!row[i] && !col[j]) b.push_back(a[i][j]);
                if (row[i] && col[j]) c.push_back(a[i][j]);
            }

            if (!b.empty()) B.push_back(b);
            if (!c.empty()) C.push_back(c);
        }

        ll ans1 = 1, ans2 = 1;
        for (int i = 0; i < B.size(); i++) {
            for (int j = 0; j < B[i].size(); j++) {
                if (i == j) ans1 = (ans1 * B[i][j]) % MOD;
                if (i + j == B.size() - 1) ans2 = (ans2 * B[i][j]) % MOD;
            }
        }

        ll ans3 = 1, ans4 = 1;
        for (int i = 0; i < C.size(); i++) {
            for (int j = 0; j < C[i].size(); j++) {
                if (i == j) ans3 = (ans3 * C[i][j]) % MOD;
                if (i + j == C.size() - 1) ans4 = (ans4 * C[i][j]) % MOD;
            }
        }

        ll ansb = (ans1 - ans2 + MOD) % MOD;
        ll ansc = (ans3 - ans4 + MOD) % MOD;
        cout << (ansb * ansc + MOD) % MOD << "\n";
    }

    return 0;
}
```

---
## Problem G: LZW 压缩
### 题目描述
给定一个长度为 $n$ 的字符串 $S$，用 $\text{LZW}$ 压缩算法进行编码，初始字典 $D$ 包括 $k$ 个信息，每条信息有两个变量 $S$ 和 $x$ ，表示正整数编码 $x$ 可以代表字符串 $S$ 。按照 LZW 算法，模拟压缩过程，输出每次输出的编码序列。

**以下是 $LZW$ 压缩算法的流程：**
1. 给定一个输入字符串 $S$ 和初始字典 $D$，设字符串 $P$ 为空串。 
2. 获取 $S$ 中未被遍历的第一个字符 $c$： 
	- 若 $P+c$（加号表示字符串连接）存在于字典中，则令 $P=P+c$，重复执行第 2 步。 
	- 否则，将 $P+c$ 添加到字典 $D$，其对应的编码为 $D$ 中元素的个数加一。输出 $P$ 代表的编码，令 $P=c$，重复执行第 2 步。
3. 最后，输出 $P$ 代表的编码。


### 数据范围
$1 \le n, k \le 3000$， $1 \le s \le 26$ 。

给定字符串 $S$，求 LZW 压缩算法的编码序列以及字内所有元素。$D$ 中所有字符串的长度总和不超过 $n$，且 $D$ 中没有重复的字符串。保证前 $s$ 个大写英文字母一定在字典中出现，且这 $s$ 个条目分别使用编码 $1$ ∼ $s$ 。

### 思路
这题的字典可以使用 `map` 来存储，然后使用循环一次遍历 $S$ ，并按照题目描述操作即可。**最后输出字典时比较特殊，需要排序，否则顺序不对。**

### Code
```cpp
#include <bits/stdc++.h>
using namespace std;

struct E {
    string s;
    int id;
};

int n, k, s;
vector<E> ans;
map<string, int> mp;

int main() {
    cin >> n >> k >> s;
    for (int i = 1; i <= k; i++) {
        string tmp;
        cin >> tmp;

        mp[tmp] = i;
    }

    string s;
    cin >> s;

    string p, np;
    for (auto e : s) {
        np += e;
        if (mp.count(np)) {
            p = np;
            continue;
        }

        cout << mp[p] << " ";
        int len = mp.size();
        mp[np] = len + 1;
        
        p = np = e;
    }

    cout << mp[p] << "\n";

    for (auto e : mp) ans.push_back({e.first, e.second});

    sort(ans.begin(), ans.end(), [](const E &x, const E &y) {
        return x.id < y.id;
    });

    cout << ans.size() << "\n";
    for (auto u : ans) cout << u.s << "\n";

    return 0;
}
```

## Problem H: 讨论间预约
### 题目描述
N大学图书馆讨论间预约系统，预约规则如下：
#### 基本规则
1. **预约格式**  
   - `reserve <StudentID> <RoomID> <StartTime> <Duration>`
   - `<StudentID>`: 学号（100~999）
   - `<RoomID>`: 讨论间编号（100~999）
   - `<StartTime>`: `HH:MM` 格式的时间（24小时制）
   - `<Duration>`: 预约时长（1~999分钟）

2. **预约限制**
   - 每人每次只能预约一个讨论间，且每次最多2小时（120分钟）。
   - 每个讨论间同一时刻只允许被一个人预约。
   - 同一学生的预约时间不能与自己其它未取消的预约时间重叠。

3. **违规与惩罚**
   - 若预约时长超过2小时，**或**预约时间与自己已有的未取消预约重叠，则该学生被记1次违规。
   - 违规2次：取消该学生之前所有预约。
   - 违规3次：取消所有预约，并且以后所有预约直接拒绝。

4. **预约编号**
   - 每次成功预约，分配一个编号x，x为之前所有成功预约的总次数（包括被取消的）。

5. **取消格式**
   - `cancel <x>`，x为预约编号。
   - 若该预约已被取消，输出`FAIL`，否则输出`SUCCESS`。

#### 输出说明
- 预约请求输出：
  - 成功：`SUCCESS <x>`（x为预约编号）
  - 失败：`FAIL`
- 取消请求输出：
  - 成功：`SUCCESS`
  - 失败：`FAIL`

#### 任务
根据上述规则，实现预约和取消的逻辑，并对每条指令输出结果。

### 数据范围
$1 \le n \le n$ ， $100 \le \text{StudentId}, \text{RoomID} \le 1000$ ， $1 \le \text{Duration} \le 1000$

### 思路
这题是一道比较麻烦的模拟题，为了方便，我们可以使用 `set` 来维护预订和删除操作，我们可以分类讨论：
1. 预订操作
	- 判断预定人是否在黑名单内（即违规次数 $\ge 3$ 次）
	- 判断是否与自己之前所预订成功的时间冲突（如果冲突，违规一次）
	- 判断是否与别人之前所预订这个房间的时间所冲突（如果冲突，**注意不违规，只是预订失败**）
	- 预订成功
2. 取消操作
	- 判断是否有这个订单（即这个订单是否存在）
	- 取消订单

### Code
```cpp
#include <bits/stdc++.h>
using namespace std;

typedef pair<int, int> pii;

struct Reserve_info{
    int sid, rid;
    int st, ed;
    bool status;
} reserve_info[100000 + 5];

int illegal[1000 + 5], reserve_id;
set<pii> room[1000 + 5], student[1000 + 5];
set<int> stu_reserve_info[1000 + 5];

void clean_order(int sid) {
    for (auto u : stu_reserve_info[sid]) {
        if (reserve_info[u].status == 1) {
            int rid = reserve_info[u].rid;
            int st = reserve_info[u].st;
            int ed = reserve_info[u].ed;
            reserve_info[u].status = 0;
            student[sid].erase({st, ed});
            room[rid].erase({st, ed});
        }
    }
}

void reserve() {
    int sid, rid, hour, min, dur, st, ed;
    char tmp;
    cin >> sid >> rid >> hour >> tmp >> min >> dur;

    st = hour * 60 + min;
    ed = st + dur - 1;

    // 如果是黑名单，直接预约失败
    if (illegal[sid] >= 3) {
        cout << "FAIL\n";
        return ;
    }

    // 判断时长是否不满足要求
    if (dur > 120) {
        cout << "FAIL\n";
        illegal[sid]++;

        if (illegal[sid] >= 2) clean_order(sid);
        return ;
    } 

    // 判断是否与之前自己预订成功的时间重叠
    bool flag = false;
    for (auto u : student[sid]) {
        if (ed >= u.first && st <= u.second) {
            flag = true;
            break;
        }
        if (st < u.second && ed >= u.first) {
	        flag = true;
	        break;
        }
    }
    if (flag) { // 违规
        cout << "FAIL\n";
        illegal[sid]++;

        if (illegal[sid] >= 2) clean_order(sid);
        return ;
    }

    // 判断是否与其他人预订的时间重叠
    flag = false;
    for (auto u : room[rid]) {
        if (ed >= u.first && st <= u.second) {
            flag = true;
            break;
        }
        if (st < u.second && ed >= u.first) {
	        flag = true;
	        break;
        }
    }
    if (flag) { // 预约失败但不违规
        cout << "FAIL\n";
        return ;
    }

    // 预约成功
    reserve_id++;
    reserve_info[reserve_id] = {sid, rid, st, ed, 1};
    student[sid].insert({st, ed});
    room[rid].insert({st, ed});
    stu_reserve_info[sid].insert(reserve_id);
    cout << "SUCCESS " << reserve_id << "\n";
}

void cancel() {
    int u;
    cin >> u;

    if (reserve_info[u].status == 0) {
        cout << "FAIL\n";
        return ;
    }

    int sid = reserve_info[u].sid;
    int rid = reserve_info[u].rid;
    int st = reserve_info[u].st;
    int ed = reserve_info[u].ed;
    reserve_info[u].status = 0;
    student[sid].erase({st, ed});
    room[rid].erase({st, ed});
    cout << "SUCCESS\n";
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int T;
    cin >> T;

    while (T--) {
        string op;
        cin >> op;

        if (op == "reserve") reserve();
        else cancel();
    }

    return 0;
}
```

---
`2025/7/19`    `By: Vickwan`