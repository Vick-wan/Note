# 二分

**二分**`(binary search)`，也叫折半搜索。 是一个用来缩短时间的优化算法，复杂度`o(logn)`。
在二分的过程中，必须要满足单调性。

## 为什么要满足单调性

### 什么是二分要满足单调性？

就是要二分的那个容器，一定要按照某一个规律，不管是从小到大、从大到小还是其他方式。
假如有一个数组 $a[10]$ 。排完序后二分时会发现，它变成了这个样子：

![](C:\Users\vickw\AppData\Roaming\marktext\images\2024-08-07-10-27-50-image.png)如果不满足，你就会发现二分时无法确定那个区域是正确的。

## 整数二分

顾名思义，就是在 **整数** 下的二分。

### 实现

以下是一个二分去查找a数组里的x元素的下标

```cpp
#include <bits/stdc++.h>
using namespace std;

int x, n;
int a[10];

int main(){
    cin >> n >> x;
    for(int i = 1;  i <= n; i++){
        cin >> a[i];
    }

    sort(a + 1, a + n + 1); // 一定要排序

    int l = 1, r = n;
    while(r <= l){
        int mid = (l + r) / 2;

        if(a[mid] == x){
            cout << mid;
            return 0;
        } else if(a[mid] > x) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    cout << "No ans";

    return 0;
}
```

## 浮点二分
顾名思义，浮点二分就是浮点数的二分，